<?php

use App\Models\PhotoCat;
use App\Repositories\PhotoCatRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PhotoCatRepositoryTest extends TestCase
{
	use MakePhotoCatTrait, ApiTestTrait, DatabaseTransactions;

	/**
	 * @var PhotoCatRepository
	 */
	protected $photoCatRepo;

	public function setUp()
	{
		parent::setUp();
		$this->photoCatRepo = App::make(PhotoCatRepository::class);
	}

	/**
	 * @test create
	 */
	public function testCreatePhotoCat()
	{
		$photoCat = $this->fakePhotoCatData();
		$createdPhotoCat = $this->photoCatRepo->create($photoCat);
		$createdPhotoCat = $createdPhotoCat->toArray();
		$this->assertArrayHasKey('id', $createdPhotoCat);
		$this->assertNotNull($createdPhotoCat['id'], 'Created PhotoCat must have id specified');
		$this->assertNotNull(PhotoCat::find($createdPhotoCat['id']), 'PhotoCat with given id must be in DB');
		$this->assertModelData($photoCat, $createdPhotoCat);
	}

	/**
	 * @test read
	 */
	public function testReadPhotoCat()
	{
		$photoCat = $this->makePhotoCat();
		$dbPhotoCat = $this->photoCatRepo->find($photoCat->id);
		$dbPhotoCat = $dbPhotoCat->toArray();
		$this->assertModelData($photoCat->toArray(), $dbPhotoCat);
	}

	/**
	 * @test update
	 */
	public function testUpdatePhotoCat()
	{
		$photoCat = $this->makePhotoCat();
		$fakePhotoCat = $this->fakePhotoCatData();
		$updatedPhotoCat = $this->photoCatRepo->update($fakePhotoCat, $photoCat->id);
		$this->assertModelData($fakePhotoCat, $updatedPhotoCat->toArray());
		$dbPhotoCat = $this->photoCatRepo->find($photoCat->id);
		$this->assertModelData($fakePhotoCat, $dbPhotoCat->toArray());
	}

	/**
	 * @test delete
	 */
	public function testDeletePhotoCat()
	{
		$photoCat = $this->makePhotoCat();
		$resp = $this->photoCatRepo->delete($photoCat->id);
		$this->assertTrue($resp);
		$this->assertNull(PhotoCat::find($photoCat->id), 'PhotoCat should not exist in DB');
	}
}
