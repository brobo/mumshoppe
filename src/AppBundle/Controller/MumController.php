<?php
namespace AppBundle\Controller;

use ReflectionClass;

use AppBundle\Entity\Mum;
use AppBundle\Form\MumType;

/**
 * @Route("/mum")
 */
class MumController extends RestController {

	public function getMumManager() {
		return $this->get('mum_manager');
	}

	protected function getEntityManager() {
		return getMumManager();
	}

	public function __construct() {
		parent::__construct('Mum', 'MumType');
	}

}
