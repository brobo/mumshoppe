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
	 * @ORM\OneToOne(targetEntity="Transaction")
	 * @ORM\JoinColumn(name="deposit_id", referencedColumnName="id")
	 */
	protected $deposit;

	/**
	 * @ORM\Column(type="boolean")
	 */
	protected $paid;

	/**
	 * @ORM\OneToOne(targetEntity="Transaction")
	 * @ORM\JoinColumn(name="payment_id", referencedColumnName="id")
	 */
	protected $payment;

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


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     * @return Order
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created
     *
     * @return \DateTime 
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Set deposited
     *
     * @param boolean $deposited
     * @return Order
     */
    public function setDeposited($deposited)
    {
        $this->deposited = $deposited;

        return $this;
    }

    /**
     * Get deposited
     *
     * @return boolean 
     */
    public function getDeposited()
    {
        return $this->deposited;
    }

    /**
     * Set paid
     *
     * @param boolean $paid
     * @return Order
     */
    public function setPaid($paid)
    {
        $this->paid = $paid;

        return $this;
    }

    /**
     * Get paid
     *
     * @return boolean 
     */
    public function getPaid()
    {
        return $this->paid;
    }

    /**
     * Set customer
     *
     * @param \AppBundle\Entity\Customer $customer
     * @return Order
     */
    public function setCustomer(\AppBundle\Entity\Customer $customer = null)
    {
        $this->customer = $customer;

        return $this;
    }

    /**
     * Get customer
     *
     * @return \AppBundle\Entity\Customer 
     */
    public function getCustomer()
    {
        return $this->customer;
    }

    /**
     * Set mum
     *
     * @param \AppBundle\Entity\Mum $mum
     * @return Order
     */
    public function setMum(\AppBundle\Entity\Mum $mum = null)
    {
        $this->mum = $mum;

        return $this;
    }

    /**
     * Get mum
     *
     * @return \AppBundle\Entity\Mum 
     */
    public function getMum()
    {
        return $this->mum;
    }

    /**
     * Set deposit
     *
     * @param \AppBundle\Entity\Transaction $deposit
     * @return Order
     */
    public function setDeposit(\AppBundle\Entity\Transaction $deposit = null)
    {
        $this->deposit = $deposit;

        return $this;
    }

    /**
     * Get deposit
     *
     * @return \AppBundle\Entity\Transaction 
     */
    public function getDeposit()
    {
        return $this->deposit;
    }

    /**
     * Set payment
     *
     * @param \AppBundle\Entity\Transaction $payment
     * @return Order
     */
    public function setPayment(\AppBundle\Entity\Transaction $payment = null)
    {
        $this->payment = $payment;

        return $this;
    }

    /**
     * Get payment
     *
     * @return \AppBundle\Entity\Transaction 
     */
    public function getPayment()
    {
        return $this->payment;
    }
}
