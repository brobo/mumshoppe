<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

use Symfony\Component\Validator\Constraints as Assert;

use JMS\Serializer\Annotation\SerializedName;

/**
 * @ORM\Entity
 * @ORM\Table(name="orders")
 */
class Order {

    public function __construct($customer, $mum) {
        $this->customer = $customer;
        $this->mum = $mum;
        $this->deposited = false;
        $this->paid = false;
        $this->created = new \DateTime('now');
    }

	/**
	 * @ORM\Id
	 * @ORM\GeneratedValue
	 * @ORM\Column(type="integer")
	 */
	protected $id;

	/**
	 * @ORM\Column(type="datetime")
	 */
	protected $created;

	/**
	 * @ORM\Column(type="boolean")
	 */
	protected $deposited;

	/**
	 * @ORM\Column(type="boolean")
	 */
	protected $paid;

    /**
     * @ORM\ManyToOne(targetEntity="Customer", inversedBy="orders")
     * @ORM\JoinColumn(name="customer_id", referencedColumnName="id")
     */
    protected $customer;

	/**
	 * @ORM\ManyToOne(targetEntity="Mum")
	 * @ORM\JoinColumn(name="mum_id", referencedColumnName="id")
	 */
	protected $mum;

}

?>
