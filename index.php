<?
if (isset($_GET['n'])) {
    mysql_connect('localhost', 'USER', 'PASSWORD') and mysql_select_db('DATABASE') or die("database error");
    mysql_set_charset('utf8'); 

    $name = mysql_real_escape_string($_GET['n']);
    $inc  = mysql_real_escape_string($_GET['l']);

    $res = mysql_query("SELECT nom as n, tel as t FROM tels WHERE nom LIKE '".$name."%' OR nom LIKE '% ".$name."%' OR tel LIKE '%".$name."%' ORDER BY nom LIMIT ".$inc.", 25");
    $rows = array();
    while($r = mysql_fetch_assoc($res)) {
        $rows[] = $r;
    }
    print json_encode($rows);
    die();
}
?><!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="author" content="Pere Orga" />
<title>Phone guide</title>
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.1.1/jquery.mobile-1.1.1.min.css" />
<link href="favicon.png" rel="shortcut icon" />
</head> 
<body>
<div data-role="page" class="type-interior">
    <div data-role="content">
        <div class="ui-listview-filter ui-bar-c">
            <input id="inputsearch" placeholder="Search by name or by number..." data-type="search" class="ui-input-text ui-body-c" />
        </div>
        <div class="content-primary">
            <ul id="llista" data-role="listview"></ul>
        </div>
    </div>
</div>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="http://code.jquery.com/mobile/1.1.1/jquery.mobile-1.1.1.min.js"></script>
<script src="guia.js"></script>
</body>
</html>