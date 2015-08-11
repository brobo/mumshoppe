<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

use Symfony\Component\Validator\Constraints as Assert;

use JMS\Serializer\Annotation\SerializedName;

/**
 * @ORM\Entity
 * @ORM\Table(name="transactions")
 */
class Transaction {

	/**
	 * @ORM\Id
	 * @ORM\GeneratedValue
	 * @ORM\Column(type="integer")
	 */
	public $id;

	/**
	 * @ORM\Column(type="string")
	 * @SerializedName("paypalId")
	 */
	public $paypalId;

	/**
	 * @ORM\Column(type="datetime")
	 */
	public $timestamp;

	public function __construct($paypalId, $timestamp) {
		$this->paypalId = $paypalId;
		$this->timestamp = $timestamp;
	}

}