<?php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * @Route("/api/association")
 */
class AccessoryAssociationController extends EntityController {

	public function getAccessoryAssociationManager() {
		return $this->get('accessory_association_manager');
	}

	public function getEntityManager() {
		return $this->getAccessoryAssociationManager();
	}

	public function __construct() {
		parent::__construct('AccessoryAssociation', 'AccessoryAssociationType');
	}

}

?>
