<?php

use App\Models\PlaceReview;
use App\Repositories\PlaceReviewRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PlaceReviewRepositoryTest extends TestCase
{
	use MakePlaceReviewTrait, ApiTestTrait, DatabaseTransactions;

	/**
	 * @var PlaceReviewRepository
	 */
	protected $placeReviewRepo;

	public function setUp()
	{
		parent::setUp();
		$this->placeReviewRepo = App::make(PlaceReviewRepository::class);
	}

	/**
	 * @test create
	 */
	public function testCreatePlaceReview()
	{
		$placeReview = $this->fakePlaceReviewData();
		$createdPlaceReview = $this->placeReviewRepo->create($placeReview);
		$createdPlaceReview = $createdPlaceReview->toArray();
		$this->assertArrayHasKey('id', $createdPlaceReview);
		$this->assertNotNull($createdPlaceReview['id'], 'Created PlaceReview must have id specified');
		$this->assertNotNull(PlaceReview::find($createdPlaceReview['id']), 'PlaceReview with given id must be in DB');
		$this->assertModelData($placeReview, $createdPlaceReview);
	}

	/**
	 * @test read
	 */
	public function testReadPlaceReview()
	{
		$placeReview = $this->makePlaceReview();
		$dbPlaceReview = $this->placeReviewRepo->find($placeReview->id);
		$dbPlaceReview = $dbPlaceReview->toArray();
		$this->assertModelData($placeReview->toArray(), $dbPlaceReview);
	}

	/**
	 * @test update
	 */
	public function testUpdatePlaceReview()
	{
		$placeReview = $this->makePlaceReview();
		$fakePlaceReview = $this->fakePlaceReviewData();
		$updatedPlaceReview = $this->placeReviewRepo->update($fakePlaceReview, $placeReview->id);
		$this->assertModelData($fakePlaceReview, $updatedPlaceReview->toArray());
		$dbPlaceReview = $this->placeReviewRepo->find($placeReview->id);
		$this->assertModelData($fakePlaceReview, $dbPlaceReview->toArray());
	}

	/**
	 * @test delete
	 */
	public function testDeletePlaceReview()
	{
		$placeReview = $this->makePlaceReview();
		$resp = $this->placeReviewRepo->delete($placeReview->id);
		$this->assertTrue($resp);
		$this->assertNull(PlaceReview::find($placeReview->id), 'PlaceReview should not exist in DB');
	}
}
