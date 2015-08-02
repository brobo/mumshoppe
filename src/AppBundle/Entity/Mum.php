<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

use JMS\Serializer\Annotation\SerializedName;

/**
 * @ORM\Entity
 * @ORM\Table(name="mums")
 */
class Mum {

	/**
	 * @ORM\Column(type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue
	 */
	protected $id;

	/**
	 * @ORM\ManyToMany(targetEntity="Accessory")
	 * @ORM\JoinTable(name="mum_accessories",
	 * 		joinColumns={@ORM\JoinColumn(name="mum_id", referencedColumnName="id")},
	 * 		inverseJoinColumns={@ORM\JoinColumn(name="accessory_id", referencedColumnName="id")}
	 *  )
	 */
	protected $accessories;

	/**
	 * @ORM\ManyToOne(targetEntity="AccentBow")
	 * @ORM\JoinColumn(name="accentbow_id", referencedColumnName="id")
     * @SerializedName("accentBow")
	 */
	protected $accentBow;

	/**
	 * @ORM\ManyToOne(targetEntity="Backing")
	 * @ORM\JoinColumn(name="backing_id", referencedColumnName="id")
	 */
	protected $backing;

	/**
	 * @ORM\ManyToMany(targetEntity="Bear")
	 * @ORM\JoinTable(name="mum_bears",
	 * 		joinColumns={@ORM\JoinColumn(name="mum_id", referencedColumnName="id")},
	 * 		inverseJoinColumns={@ORM\JoinColumn(name="bear_id", referencedColumnName="id")}
	 * 	)
	 */
	protected $bears;

	/**
	 * @ORM\OneToMany(targetEntity="Ribbon", mappedBy="mum")
	 */
	protected $ribbons;

	public function __construct() {
		$accessories = new ArrayCollection();
		$bears = new ArrayCollection();
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
     * Add accessories
     *
     * @param \AppBundle\Entity\Accessory $accessories
     * @return Mum
     */
    public function addAccessory(\AppBundle\Entity\Accessory $accessories)
    {
        $this->accessories[] = $accessories;

        return $this;
    }

    /**
     * Remove accessories
     *
     * @param \AppBundle\Entity\Accessory $accessories
     */
    public function removeAccessory(\AppBundle\Entity\Accessory $accessories)
    {
        $this->accessories->removeElement($accessories);
    }

    /**
     * Get accessories
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getAccessories()
    {
        return $this->accessories;
    }

    /**
     * Set accentBow
     *
     * @param \AppBundle\Entity\AccentBow $accentBow
     * @return Mum
     */
    public function setAccentBow(\AppBundle\Entity\AccentBow $accentBow = null)
    {
        $this->accentBow = $accentBow;

        return $this;
    }

    /**
     * Get accentBow
     *
     * @return \AppBundle\Entity\AccentBow 
     */
    public function getAccentBow()
    {
        return $this->accentBow;
    }

    /**
     * Set backing
     *
     * @param \AppBundle\Entity\Backing $backing
     * @return Mum
     */
    public function setBacking(\AppBundle\Entity\Backing $backing = null)
    {
        $this->backing = $backing;

        return $this;
    }

    /**
     * Get backing
     *
     * @return \AppBundle\Entity\Backing 
     */
    public function getBacking()
    {
        return $this->backing;
    }

    /**
     * Add bears
     *
     * @param \AppBundle\Entity\Bear $bears
     * @return Mum
     */
    public function addBear(\AppBundle\Entity\Bear $bears)
    {
        $this->bears[] = $bears;

        return $this;
    }

    /**
     * Remove bears
     *
     * @param \AppBundle\Entity\Bear $bears
     */
    public function removeBear(\AppBundle\Entity\Bear $bears)
    {
        $this->bears->removeElement($bears);
    }

    /**
     * Get bears
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getBears()
    {
        return $this->bears;
    }

    /**
     * Add ribbons
     *
     * @param \AppBundle\Entity\Ribbon $ribbons
     * @return Mum
     */
    public function addRibbon(\AppBundle\Entity\Ribbon $ribbons)
    {
        $this->ribbons[] = $ribbons;

        return $this;
    }

    /**
     * Remove ribbons
     *
     * @param \AppBundle\Entity\Ribbon $ribbons
     */
    public function removeRibbon(\AppBundle\Entity\Ribbon $ribbons)
    {
        $this->ribbons->removeElement($ribbons);
    }

    /**
     * Get ribbons
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getRibbons()
    {
        return $this->ribbons;
    }
}
