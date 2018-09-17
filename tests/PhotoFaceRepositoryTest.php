<?php

use App\Models\PhotoFace;
use App\Repositories\PhotoFaceRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PhotoFaceRepositoryTest extends TestCase
{
    use MakePhotoFaceTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var PhotoFaceRepository
     */
    protected $photoFaceRepo;

    public function setUp()
    {
        parent::setUp();
        $this->photoFaceRepo = App::make(PhotoFaceRepository::class);
    }

    /**
     * @test create
     */
    public function testCreatePhotoFace()
    {
        $photoFace = $this->fakePhotoFaceData();
        $createdPhotoFace = $this->photoFaceRepo->create($photoFace);
        $createdPhotoFace = $createdPhotoFace->toArray();
        $this->assertArrayHasKey('id', $createdPhotoFace);
        $this->assertNotNull($createdPhotoFace['id'], 'Created PhotoFace must have id specified');
        $this->assertNotNull(PhotoFace::find($createdPhotoFace['id']), 'PhotoFace with given id must be in DB');
        $this->assertModelData($photoFace, $createdPhotoFace);
    }

    /**
     * @test read
     */
    public function testReadPhotoFace()
    {
        $photoFace = $this->makePhotoFace();
        $dbPhotoFace = $this->photoFaceRepo->find($photoFace->id);
        $dbPhotoFace = $dbPhotoFace->toArray();
        $this->assertModelData($photoFace->toArray(), $dbPhotoFace);
    }

    /**
     * @test update
     */
    public function testUpdatePhotoFace()
    {
        $photoFace = $this->makePhotoFace();
        $fakePhotoFace = $this->fakePhotoFaceData();
        $updatedPhotoFace = $this->photoFaceRepo->update($fakePhotoFace, $photoFace->id);
        $this->assertModelData($fakePhotoFace, $updatedPhotoFace->toArray());
        $dbPhotoFace = $this->photoFaceRepo->find($photoFace->id);
        $this->assertModelData($fakePhotoFace, $dbPhotoFace->toArray());
    }

    /**
     * @test delete
     */
    public function testDeletePhotoFace()
    {
        $photoFace = $this->makePhotoFace();
        $resp = $this->photoFaceRepo->delete($photoFace->id);
        $this->assertTrue($resp);
        $this->assertNull(PhotoFace::find($photoFace->id), 'PhotoFace should not exist in DB');
    }
}
