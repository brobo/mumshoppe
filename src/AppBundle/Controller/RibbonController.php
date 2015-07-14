<?php
namespace AppBundle\Controller;

use AppBundle\Entity\Ribbon;
use AppBundle\Form\RibbonType;

use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("/api/ribbon")
 */
class RibbonController extends RestController {

	public function getRibbonManager() {
		return $this->get("ribbon_manager");
	}

	/**
	 * @Route("/")
	 * @Method({"GET"})
	 */
	public function indexAction() {
		$ribbons = $this->getRibbonManager()->findAll();

		return $this->respondJson($ribbons);
	}

	/**
	 * @Route("/{id}")
	 * @Method({"GET"})
	 */
	public function showAction($id) {
		$ribbon = $this->getRibbonManager()->findById($id);

		if ($ribbon === null) {
			return $this->fail();
		} else {
			return $this->respondJson($ribbon);
		}
	}
}

