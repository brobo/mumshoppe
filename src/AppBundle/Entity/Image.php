<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

use Symfony\Component\Validator\Constraints as Assert;

use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * @ORM\Entity
 * @ORM\Table(name="images")
 */
class Image {

	/**
	 * @ORM\Column(type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue
	 */
	protected $id;

	/** 
	 * @ORM\Column(type="string", length=255)
	 * @Assert\NotBlank()
	 */
	protected $path;

    /**
     * @Assert\File(maxSize=6000000)
     */
    private $file;

	public function getAbsolutePath() {
		return $this->getUploadRootDir() . '/' . $this->path;
	}

	public function getWebPath() {
		return $this->getUploadDir() . '/' . $this->path;
	}


	protected function getUploadRootDir()
	{
		return __DIR__ . '/../../../../' . $this->getUploadDir();
	}

	protected function getUploadDir()
	{
		return 'uploads/images';
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
     * Set path
     *
     * @param string $path
     * @return Image
     */
    public function setPath($path)
    {
        $this->path = $path;

        return $this;
    }

    /**
     * Get path
     *
     * @return string 
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * Set the file
     *
     * @param UploadedFile file
     * @return Image
     */
    public function setFile(UploadedFile $file) {
        $this->file = $file;

        return $this;
    }

    /**
     * Get file
     *
     * @return UploadedFile
     */
    public function getFile() {
        return $this->file;
    }
    
}
