<?php
  function isNameFolder($nameFolder) {
    return is_dir($nameFolder);
  }

  function createFolder($nameFolder){
    if (!isNameFolder($nameFolder))
      mkdir($nameFolder, 0777, true);
  }

  function dirToArray($dir) { 
    
    $result = array(); 
 
    $cdir = scandir($dir); 
    foreach ($cdir as $key => $value) 
    { 
       if (!in_array($value,array(".",".."))) 
       { 
          if (is_dir($dir . DIRECTORY_SEPARATOR . $value)) 
          { 
             $result[$value] = dirToArray($dir . DIRECTORY_SEPARATOR . $value); 
          } 
          else 
          { 
             $result[] = $value; 
          } 
       } 
    } 
    
    return $result; 
 } 

 function getDirectories($path)
 {
     $directories = [];
     $items = scandir($path);
     foreach ($items as $item) {
         if($item == '..' || $item == '.')
             continue;
         if(is_dir($path.'/'.$item))
             $directories[] = $item;
     }
     return $directories;
 }