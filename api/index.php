<?php

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

use Slim\Slim;
$app = new Slim();

$app->get('/entries(/:search(/:limit))', 'getEntries');
$app->run();

function getConnection() {
    $dbhost = '127.0.0.1';
    $dbuser = 'username';
    $dbpass = 'password';
    $dbname = 'database';
    $db = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $db;
}

function getEntries($search = "", $limit = 0) {
    $search = "%$search%";
    $sql = "SELECT name AS n, phone AS p FROM phones WHERE name LIKE :name OR phone LIKE :phone ORDER BY name LIMIT :limit, 25";
    try {
        $db = getConnection();
        $query = $db->prepare($sql);
        $query->bindParam("name", $search);
        $query->bindParam("phone", $search);
        $query->bindValue("limit", intval(trim($limit)), PDO::PARAM_INT);
        $query->execute();
        $entries = $query->fetchAll(PDO::FETCH_OBJ);

        echo json_encode($entries);

    } catch(PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}
