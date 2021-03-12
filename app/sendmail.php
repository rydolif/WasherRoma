<?php

	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	require 'phpmailer/src/SMTP.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	//От каго письмо
	$mail->setFrom('washservis@email.ua', 'Стартовый макет');
	//Кому отправить
	$mail->addAddress('washservis@email.ua');
	//Тема письма
	$mail->Subject = ('Привет это тест отправки формы');

	//Тело письма
	$body = '<h1>Заголовок письма</h1>';

	if(trim(!empty($_POST['name']))) {
		$body.='<p><strong>Имя: </strong>' . $_POST['name']. '</p>';
	}
	if(trim(!empty($_POST['phone']))) {
		$body.='<p><strong>Телефон: </strong>' . $_POST['phone']. '</p>';
	}
	$mail->Body = $body;

	//Отправляем
	if (!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$massage = 'Данные отправлены!';
	}

	$response = ['message' => $massage];

	header('Content-type: application/json');
	echo json_encode($response);


?>