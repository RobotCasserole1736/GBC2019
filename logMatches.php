<?php
//Write to csv file (legacy)
$file = fopen('data/matchData.csv', 'a');
$data = $_GET['matchData'];
fwrite($file, $data);
fwrite($file, "\n");
fclose($file);

//Write to database
$db = new SQLite3('/data/ScoutingDatabase.db') or die('0');
$stringFields = array(0, 3, 13, 14, 36);
$fields = explode(",", $data);
for($x=0; $x<count($stringFields), $x++) {
	$fields[$stringFields[$x]] = '"' . $fields[$stringFields[$x]] . '"';
}
$dataUpdated = implode(",", $fields);
$query = "INSERT INTO ScoutData VALUES(" . $dataUpdated . ")";
$db->execute($query);
?>
