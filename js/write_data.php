<?php

    $data = $_POST['filedata'];
    $name = $_POST['filename'];
    $path = './data';

    $dir = $path . "/";

    $f = $dir . $name;
    $fp = fopen($f, "w+");

    fwrite($fp, str_replace("\\", "", $data));
    fclose($fp);

    echo "success";

?>