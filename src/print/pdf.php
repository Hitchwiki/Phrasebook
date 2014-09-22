<?php
/*
 * Produce Phrasebook pdf file
 *
 * Requires: to, from GET variable. Valid language code existing in src/languages.json
 * Optional: dl GET variable, forces browser to download pdf
 *
 */
require_once('tcpdf/tcpdf.php');

// Le Data
$languages = is_file('languages.json') ? json_decode(file_get_contents('languages.json')) : array();
$structure = is_file('structure.json') ? json_decode(file_get_contents('structure.json')) : array();
$strings = is_file('structure.json') ? json_decode(file_get_contents('strings.json')) : array();

// Le situations of "no good"
if( empty($structure) ||
    empty($strings) ||
    empty($languages) ||
    !isset($_GET['from']) ||
    !isset($_GET['to']) ||
    empty($_GET['from']) ||
    empty($_GET['to'])
) die("Crash boom bang! Something went wrong.");


// Check it's really a language we've got
foreach($languages as $language) {

    if( $language->code == $_GET['from'] ) $language_from = $language;

    if( $language->code == $_GET['to'] ) $language_to = $language;
}

// Die out if we didn't find language
if( !isset($language_from) || !isset($language_to) ) die("Crash boom bang! We don't have that language here, sorry!");


/*
 * Gettext
 * Gettext is looking translation from "./locale/LANGUAGE_CODE/LC_MESSAGES/phrasebook.mo"
 * http://www.php.net/manual/en/function.gettext.php
 */
function translate($lang) {
    global $strings;

    putenv('LC_ALL='.$lang);
    setlocale(LC_ALL, $lang);

    // Specify location of translation tables and choose gettext domain
    bindtextdomain("phrasebook", realpath(dirname(__FILE__)) . "/locale/");
    bind_textdomain_codeset("phrasebook", 'UTF-8');
    textdomain("phrasebook");

    $translations = array();

    foreach ( (array)$strings->phrasebook as $key => $string ) {
        $translations['phrasebook'][$key] = _($string);
    }
    foreach ( (array)$strings->categories as $key => $string ) {
        $translations['categories'][$key] = _($string);
    }

    return $translations;
}

$translations_to = translate($language_to->code);
$translations_from = translate($language_from->code);


// Extend the TCPDF class to create custom Footer
class MYPDF extends TCPDF {

	// Page footer
	public function Footer() {
		$this->SetY(0);
		$this->SetFont('helvetica', 'I', 8);
		// Page number
		$this->Cell(0, 10, $this->getAliasNumPage().'/'.$this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
	}
}



// Create new PDF document
$pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);

// set document information
$pdf->SetCreator('Hitchwiki.org');
$pdf->SetAuthor('Hitchwiki.org');
$pdf->SetTitle('Hitchwiki Phrasebook');
$pdf->SetSubject('Translation');
$pdf->SetKeywords('Phrasebook, Hitchwiki, hitchhiking, traveling, autostop');

// set default header data
//$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 001', PDF_HEADER_STRING, array(0,64,255), array(0,64,128));
$pdf->SetHeaderData(false, 3, 'Hitchwiki Phrasebook', $language_from->name_english . ' — ' . $language_to->name_english, array(0,0,0), array(0,0,0));
$pdf->setPrintFooter(true);

// set header and footer fonts
$pdf->setHeaderFont(Array('helvetica', '', 9));

// set margins
$pdf->SetMargins(10, 27, 15); // left, top, right
$pdf->SetHeaderMargin(5);
$pdf->SetFooterMargin(10);

// set auto page breaks
$pdf->SetAutoPageBreak(true, 10);

$pdf->setLanguageArray(array(
    'a_meta_charset'    => 'UTF-8',
    'a_meta_dir'        => ( $language_from->RTL ? 'rtr' : 'ltr' ),
    'a_meta_language'   => $language_from->glotpress,
));

// ---------------------------------------------------------

// set default font subsetting mode
$pdf->setFontSubsetting(true);

// Set font
// dejavusans is a UTF-8 Unicode font, if you only need to
// print standard ASCII chars, you can use core fonts like
// helvetica or times to reduce file size.
#$pdf->SetFont('freesans', '', 12, '', true);
$pdf->SetFont('freesans', '', 12);

// Add a page
// This method has several options, check the source code documentation for more information.
$pdf->AddPage();



$html1 = '<p>';
$html2 = ' / <b>';
$html3 = '</b></p>';

$html = '';

foreach( $structure as $category ) {

    // If it's not first line
    if( !empty($html) ) $html .= '<br><br>';

    // Category header
    $html .= '<h1>' . $translations_from['categories'][$category[0]] . '</h1>';

    // Translations
    foreach( $category[1] as $key ) {
        $html .= $html1 .
                 $translations_from['phrasebook'][$key] .
                 $html2 .
                 $translations_to['phrasebook'][$key] .
                 $html3;
    }

}

$pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);

#$pdf->Write(5, $utf8text, '', 0, '', false, 0, false, false, 0);
// ---------------------------------------------------------

/*
 * Close and output PDF document
 *
 * I: send the file inline to the browser (default). The plug-in is used if available. The name given by name is used when one selects the "Save as" option on the link generating the PDF.
 * D: send to the browser and force a file download with the name given by name.
 * F: save to a local server file with the name given by name.
 * S: return the document as a string (name is ignored).
 * FI: equivalent to F + I option
 * FD: equivalent to F + D option
 * E: return the document as base64 mime multi-part email attachment (RFC 2045)
 */
$pdf->Output(
            'phrasebook-' . preg_replace("/[^A-Za-z0-9?!]/", "", substr($language_from->code, 0, 2)) . '-' . preg_replace("/[^A-Za-z0-9?!]/", "", substr($language_to->code, 0, 2)) . '.pdf',
            ( isset($_GET['dl']) ? 'D' : 'I' )
        );

