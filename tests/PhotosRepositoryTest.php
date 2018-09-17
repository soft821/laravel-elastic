<?php

use App\Models\Photos;
use App\Repositories\PhotosRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PhotosRepositoryTest extends TestCase
{
    use MakePhotosTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var PhotosRepository
     */
    protected $photosRepo;

    public function setUp()
    {
        parent::setUp();
        $this->photosRepo = App::make(PhotosRepository::class);
    }

    /**
     * @test create
     */
    public function testCreatePhotos()
    {
        $photos = $this->fakePhotosData();
        $createdPhotos = $this->photosRepo->create($photos);
        $createdPhotos = $createdPhotos->toArray();
        $this->assertArrayHasKey('id', $createdPhotos);
        $this->assertNotNull($createdPhotos['id'], 'Created Photos must have id specified');
        $this->assertNotNull(Photos::find($createdPhotos['id']), 'Photos with given id must be in DB');
        $this->assertModelData($photos, $createdPhotos);
    }

    /**
     * @test read
     */
    public function testReadPhotos()
    {
        $photos = $this->makePhotos();
        $dbPhotos = $this->photosRepo->find($photos->id);
        $dbPhotos = $dbPhotos->toArray();
        $this->assertModelData($photos->toArray(), $dbPhotos);
    }

    /**
     * @test update
     */
    public function testUpdatePhotos()
    {
        $photos = $this->makePhotos();
        $fakePhotos = $this->fakePhotosData();
        $updatedPhotos = $this->photosRepo->update($fakePhotos, $photos->id);
        $this->assertModelData($fakePhotos, $updatedPhotos->toArray());
        $dbPhotos = $this->photosRepo->find($photos->id);
        $this->assertModelData($fakePhotos, $dbPhotos->toArray());
    }

    /**
     * @test delete
     */
    public function testDeletePhotos()
    {
        $photos = $this->makePhotos();
        $resp = $this->photosRepo->delete($photos->id);
        $this->assertTrue($resp);
        $this->assertNull(Photos::find($photos->id), 'Photos should not exist in DB');
    }
}
