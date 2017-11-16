<?php

  include 'source/File.php';
  include 'source/Folder.php';
  include 'source/Common.php';
  include 'source/User.php';
  include 'source/Json.php';

  $UseName = "";
  $code = "";
  $idAction = -1;

 
  /* Function MAIN*/
  getUse();
  // check admin
  if (isAdmin($UseName, $code)){
    
    show("Admin account");
    checkCreateUse();
    exit();
  }else {
    show("User account");
    
    $idAction = getAction();
    functionAction($idAction);


  }
  // END MAIN 


  function getUse(){
    GLOBAL $UseName,$code;
    if (isset($_REQUEST['UseName'])  && isset($_REQUEST['code'])){
      $UseName = $_REQUEST['UseName'];
      $code = $_REQUEST['code'];
      show($UseName);
      show($code);
    }
  }

  function getAction(){
    
    if (isset($_REQUEST['action']))
    {
      $action = $_REQUEST['action'];
      if (strcmp($action, "isCheckLogin") == 0)
        return 0;
      else if (strcmp($action, "getYearOfUser") == 0)
        return 1;
      else if (strcmp($action, "getMonthOfYear") == 0)
        return 2;
      else if (strcmp($action, "getDayOfMonth") == 0)
        return 3;
      else if (strcmp($action, "getFileOfDay") == 0)
        return 4;
      else if (strcmp($action, "getDataOfFile") == 0)
        return 5;
        
    }
    return -1;
  }
  function functionAction($idaction){
    switch ($idaction){
      case 0: ischeckLogin(); break;
      case 1: getYearOfUser(); break;
      case 2: getMonthOfYear(); break;
      case 3: getDayOfMonth(); break;
      case 4: getFileOfDay(); break;
      case 5: getDataOfFile(); break;
    }
  }

  function checkCreateUse(){
    $createUseName = "";
    $createcode = "";
    if (isset($_REQUEST['createUseName'])  && isset($_REQUEST['createcode'])){
      $createUseName = $_REQUEST['createUseName'];
      $createcode = $_REQUEST['createcode'];
      InitData($createUseName, $createcode);
      echo "OK";
    }
  }

  function ischeckLogin(){
    GLOBAL $UseName, $code;
    if (isLogin($UseName, $code)){
      InitData($UseName, $code);
      echo 'true' ;
    }else echo 'false' ;
  }
  
  function  getYearOfUser(){
    GLOBAL $UseName, $code;
    $path = "data/". $UseName."_".$code;
    echo convertArrayToJson(getDirectories($path)) ;
  }

  function  getMonthOfYear(){
    GLOBAL $UseName, $code;
    if (isset($_REQUEST['Year'])){
      $Year = $_REQUEST['Year'];
      $path = "data/". $UseName."_".$code.'/'.$Year;
      echo convertArrayToJson(getDirectories($path)) ;
    }
    else echo "False";
  }

  function  getDayOfMonth(){
    GLOBAL $UseName, $code;
    if (isset($_REQUEST['Year']) && isset($_REQUEST['Month'])){
      $Year = $_REQUEST['Year'];
      $Month = $_REQUEST['Month'];      
      $path = "data/". $UseName."_".$code.'/'.$Year.'/'.$Month;
      echo convertArrayToJson(getDirectories($path)) ;
    } else echo "False";
  }
  
  function  getFileOfDay(){
    GLOBAL $UseName, $code;
    if (isset($_REQUEST['Year']) && isset($_REQUEST['Month']) && $_REQUEST['Day']){
      $Year = $_REQUEST['Year'];
      $Month = $_REQUEST['Month'];      
      $Day = $_REQUEST['Day'];      
      
      $path = "data/". $UseName."_".$code.'/'.$Year.'/'.$Month.'/'.$Day;
      if (isNameFolder($path)){
        echo convertArrayToJson(getFile($path)) ;
      }
    } else echo "False";
  }

  function  getDataOfFile(){
    GLOBAL $UseName, $code;
    if ( isset($_REQUEST['Year']) && isset($_REQUEST['Month']) && isset($_REQUEST['Day']) ) {
      $Year = $_REQUEST['Year'];
      $Month = $_REQUEST['Month'];      
      $Day = $_REQUEST['Day'];      
      $NameFile = $Day."_".$Month."_".$Year.".txt";      
      
      $path = "data/". $UseName."_".$code.'/'.$Year.'/'.$Month.'/'.$Day."/".$NameFile;

      $json = '[
        {"Date":"04-10-2017","Time":"19-35-05","Temperature":"31.5","Radiant":"-1.00","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"19-40-05","Temperature":"31.5","Radiant":"-1.81","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"19-45-05","Temperature":"31.5","Radiant":"69.81","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"19-50-05","Temperature":"31.6","Radiant":"-0.33","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"19-55-05","Temperature":"31.6","Radiant":"150.32","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"20-00-05","Temperature":"31.8","Radiant":"-0.47","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"20-05-05","Temperature":"31.6","Radiant":"-3.29","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"20-10-05","Temperature":"31.4","Radiant":"-3.33","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"20-15-05","Temperature":"31.2","Radiant":"-3.24","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"20-20-05","Temperature":"31.0","Radiant":"-4.06","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"20-25-05","Temperature":"30.8","Radiant":"-4.03","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"20-30-05","Temperature":"30.7","Radiant":"-3.36","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"20-35-05","Temperature":"30.6","Radiant":"-3.04","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"20-40-05","Temperature":"30.5","Radiant":"-2.96","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"20-50-05","Temperature":"30.3","Radiant":"-3.10","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"20-55-05","Temperature":"30.2","Radiant":"-2.73","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"21-00-05","Temperature":"30.1","Radiant":"-2.73","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"21-05-05","Temperature":"30.1","Radiant":"-2.84","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"21-10-05","Temperature":"30.0","Radiant":"-2.76","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"21-15-05","Temperature":"30.0","Radiant":"-2.54","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"21-20-05","Temperature":"29.9","Radiant":"-2.42","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"21-25-05","Temperature":"29.9","Radiant":"-2.65","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"21-30-05","Temperature":"29.8","Radiant":"-2.44","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"21-35-05","Temperature":"29.8","Radiant":"-2.25","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"21-40-05","Temperature":"29.8","Radiant":"-2.36","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"21-45-05","Temperature":"29.7","Radiant":"-2.75","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"21-50-05","Temperature":"29.7","Radiant":"-2.35","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"21-55-05","Temperature":"29.7","Radiant":"-2.20","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"22-00-05","Temperature":"29.6","Radiant":"-2.41","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"22-05-05","Temperature":"29.6","Radiant":"-2.20","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"22-10-05","Temperature":"29.6","Radiant":"-2.10","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"22-15-05","Temperature":"29.6","Radiant":"-1.74","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"22-20-05","Temperature":"29.6","Radiant":"-1.93","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"22-25-05","Temperature":"29.6","Radiant":"-1.62","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"22-35-05","Temperature":"29.6","Radiant":"102.14","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"22-40-05","Temperature":"0.0","Radiant":"0.00","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"22-45-05","Temperature":"0.0","Radiant":"0.00","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"22-50-05","Temperature":"0.0","Radiant":"0.00","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"22-55-05","Temperature":"0.0","Radiant":"0.00","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"23-00-05","Temperature":"0.0","Radiant":"0.00","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"23-05-05","Temperature":"0.0","Radiant":"0.00","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"23-10-05","Temperature":"0.0","Radiant":"0.00","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"23-15-05","Temperature":"0.0","Radiant":"0.00","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"23-20-05","Temperature":"0.0","Radiant":"0.00","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"23-25-05","Temperature":"0.0","Radiant":"0.00","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"23-30-05","Temperature":"0.0","Radiant":"0.00","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"23-35-05","Temperature":"0.0","Radiant":"0.00","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"23-40-05","Temperature":"0.0","Radiant":"0.00","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"23-45-05","Temperature":"0.0","Radiant":"0.00","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"23-50-05","Temperature":"0.0","Radiant":"0.00","UseName":"Den","code":"1321060356"}, 
        {"Date":"04-10-2017","Time":"23-55-05","Temperature":"0.0","Radiant":"0.00","UseName":"Den","code":"1321060356"}
    ]';
    
      if (isNameFile($path)){
        $books = json_decode($json);
        $books1 = json_decode(dataFile1($path));
        $jsonTest = '['.dataFile1($path).']';
        // echo json_decode($jsonTest);
        $book2 = json_decode($jsonTest);
        //echo convertArrayToJson($books1);
        echo convertArrayToJson($book2) ;
      }
    } else echo "False";
  }
  


  
 