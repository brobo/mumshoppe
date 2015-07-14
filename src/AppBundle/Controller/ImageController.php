<?php
namespace AppBundle\Controller;

use AppBundle\Entity\Group;
use AppBundle\Form\GroupType;

use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

abstract class ImageController extends RestController {

	public function getImageManager() {
		return $this->get('image_manager');
	}

	protected abstract function getEntityManager();

	/**
	 * @Route("/image/{id}")
	 * @Method({"GET"})
	 */
	public function getImageAction($id) {
		
	}

}