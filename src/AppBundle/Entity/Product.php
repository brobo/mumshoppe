<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

use Symfony\Component\Validator\Constraints as Assert;

use JMS\Serializer\Annotation\SerializedName;

/**
 * @ORM\Entity
 * @ORM\Table(name="products")
 */
class Product {

	/**
	 * @ORM\Column(type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue
	 * @var int
	 */
	protected $id;

	/**
	 * @ORM\Column(type="string", length=100)
	 * @Assert\NotBlank()
	 * @var string
	 */
	protected $name;

	/**
	 * @ORM\Column(type="integer")
     * @Assert\GreaterThanOrEqual(value = 0)
     * @Assert\NotBlank()
     * @SerializedName("bearLimit")
	 */
	protected $bearLimit;

    /**
     * @ORM\OneToMany(targetEntity="Backing", mappedBy="product")
     */
    private $backings;

    public function __construct() {
        $this->backings = new ArrayCollection();
    }

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
     * Set name
     *
     * @param string $name
     * @return Product
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set bearLimit
     *
     * @param integer $bearLimit
     * @return Product
     */
    public function setBearLimit($bearLimit)
    {
        $this->bearLimit = $bearLimit;

        return $this;
    }

    /**
     * Get bearLimit
     *
     * @return integer 
     */
    public function getBearLimit()
    {
        return $this->bearLimit;
    }

    /**
     * Add backings
     *
     * @param \AppBundle\Entity\Backing $backings
     * @return Product
     */
    public function addBacking(\AppBundle\Entity\Backing $backings)
    {
        $this->backings[] = $backings;

        return $this;
    }

    /**
     * Remove backings
     *
     * @param \AppBundle\Entity\Backing $backings
     */
    public function removeBacking(\AppBundle\Entity\Backing $backings)
    {
        $this->backings->removeElement($backings);
    }

    /**
     * Get backings
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getBackings()
    {
        return $this->backings;
    }
}
