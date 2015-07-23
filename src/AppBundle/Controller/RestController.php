<?php
namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\BinaryFileResponse;



abstract class RestController extends Controller {

	public function respondJson($res, $status = 200) {
		$serializer = $this->get('jms_serializer');
		$response = new Response();
		$response->setContent($serializer->serialize($res, 'json'));
		$response->setStatusCode($status);
		$response->headers->set('Content-Type', 'application/json');
		return $response;
	}

	public function respondFile($filePath, $status = 200) {
		return new BinaryFileResponse($filePath, $status);
	}

	public function fail($errors = null) {
		$response = array("success" => false);
		if ($errors !== null) {
			$response['errors'] = $errors;
		}
		return $this->respondJson($response, 401);
	}

	public function succeed() {
		return $this->respondJson(array("success" => true));
	}

}