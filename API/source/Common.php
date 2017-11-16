<?php
 
  $DEBUG = false;
  //d/m/Y H:i:s'
  date_default_timezone_set('Asia/Ho_Chi_Minh');
  $Year = getDateTimeNow('Y');
  $Month = getDateTimeNow('m');
  $Day = getDateTimeNow('d');
  $createFile = "";
  $createFolder = "";
  $path = "";

  $createFile = $Day.'_'.$Month.'_'.$Year.".txt";

  function show($str){
    GLOBAL $DEBUG;
    if ($DEBUG)
        echo $str."<br/>";
  }

  function getDateTimeNow($format){
    return date($format);
  }

  function InitData($useName, $code){
    GLOBAL $createFile, $createFolder, $path, $Year, $Month, $Day;
    $createFolder= 'data/'.$useName.'_'.$code.'/'.$Year.'/'.$Month.'/'.$Day;
    $path = $createFolder.'/'.$createFile;
    createFolder($createFolder);
    createFile($path);
    show("Create new file");
  }

  function getPathFile(){
    GLOBAL $path;
    return $path;
  }

  

