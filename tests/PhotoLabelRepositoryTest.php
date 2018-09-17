<?php

use App\Models\PhotoLabel;
use App\Repositories\PhotoLabelRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PhotoLabelRepositoryTest extends TestCase
{
	use MakePhotoLabelTrait, ApiTestTrait, DatabaseTransactions;

	/**
	 * @var PhotoLabelRepository
	 */
	protected $photoLabelRepo;

	public function setUp()
	{
		parent::setUp();
		$this->photoLabelRepo = App::make(PhotoLabelRepository::class);
	}

	/**
	 * @test create
	 */
	public function testCreatePhotoLabel()
	{
		$photoLabel = $this->fakePhotoLabelData();
		$createdPhotoLabel = $this->photoLabelRepo->create($photoLabel);
		$createdPhotoLabel = $createdPhotoLabel->toArray();
		$this->assertArrayHasKey('id', $createdPhotoLabel);
		$this->assertNotNull($createdPhotoLabel['id'], 'Created PhotoLabel must have id specified');
		$this->assertNotNull(PhotoLabel::find($createdPhotoLabel['id']), 'PhotoLabel with given id must be in DB');
		$this->assertModelData($photoLabel, $createdPhotoLabel);
	}

	/**
	 * @test read
	 */
	public function testReadPhotoLabel()
	{
		$photoLabel = $this->makePhotoLabel();
		$dbPhotoLabel = $this->photoLabelRepo->find($photoLabel->id);
		$dbPhotoLabel = $dbPhotoLabel->toArray();
		$this->assertModelData($photoLabel->toArray(), $dbPhotoLabel);
	}

	/**
	 * @test update
	 */
	public function testUpdatePhotoLabel()
	{
		$photoLabel = $this->makePhotoLabel();
		$fakePhotoLabel = $this->fakePhotoLabelData();
		$updatedPhotoLabel = $this->photoLabelRepo->update($fakePhotoLabel, $photoLabel->id);
		$this->assertModelData($fakePhotoLabel, $updatedPhotoLabel->toArray());
		$dbPhotoLabel = $this->photoLabelRepo->find($photoLabel->id);
		$this->assertModelData($fakePhotoLabel, $dbPhotoLabel->toArray());
	}

	/**
	 * @test delete
	 */
	public function testDeletePhotoLabel()
	{
		$photoLabel = $this->makePhotoLabel();
		$resp = $this->photoLabelRepo->delete($photoLabel->id);
		$this->assertTrue($resp);
		$this->assertNull(PhotoLabel::find($photoLabel->id), 'PhotoLabel should not exist in DB');
	}
}
