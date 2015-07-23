<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

use Symfony\Component\Validator\Constraints as Assert;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\File\File;

/**
 * @ORM\Entity
 * @ORM\Table(name="images")
 * @ORM\HasLifecycleCallbacks
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

    /**
     * @ORM\PrePersist()
     * @ORM\PreUpdate()
     */
    public function preUpload() {
        if ($this->getFile() !== null) {
            $filename = sha1(uniqid(mt_rand(), true));
            $this->path = $filename . '.' . $this->getFile()->guessExtension();
        }
    }

    /**
     * @ORM\PostPersist()
     * @ORM\PostUpdate()
     */
    public function upload() {
        if ($this->getFile() === null) {
            return;
        }

        $this->getFile()->move(
            $this->getUploadRootDir(),
            $this->path
        );

        $this->file = null;
    }

    /** 
     * @ORM\PostRemove()
     */
    public function removeUpload() {
        $file = $this->getAbsolutePath();
        if ($file) {
            unlink($file);
        }
    }

	public function getAbsolutePath() {
		return $this->getUploadRootDir() . '/' . $this->path;
	}

	public function getWebPath() {
		return $this->getUploadDir() . '/' . $this->path;
	}


	protected function getUploadRootDir()
	{
		return __DIR__ . '/../../../web/' . $this->getUploadDir();
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

        if (isset($this->path)) {
            $this->temp = $this->path;
            $this->path = null;
        } else {
            $this->path = 'initial';
        }

        return $this;
    }

    /**
     * Get file
     *
     * @return UploadedFile
     */
    public function getFile() {
        if (!isset($this->file)) {
            $this->file = new File($this->getAbsolutePath());
        }
        
        return $this->file;
    }
    
}
