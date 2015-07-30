<?php
namespace AppBundle\Controller;

use ReflectionClass;

use AppBundle\Entity\Mum;
use AppBundle\Form\MumType;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * @Route("/api/mum")
 */
class MumController extends EntityController {

	public function getMumManager() {
		return $this->get('mum_manager');
	}

	protected function getEntityManager() {
		return $this->getMumManager();
	}

	public function __construct() {
		parent::__construct('Mum', 'MumType');
	}

}
