<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PlaceReviewImageApiTest extends TestCase
{
	use MakePlaceReviewImageTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

	/**
	 * @test
	 */
	public function testCreatePlaceReviewImage()
	{
		$placeReviewImage = $this->fakePlaceReviewImageData();
		$this->json('POST', '/api/v1/placeReviewImages', $placeReviewImage);

		$this->assertApiResponse($placeReviewImage);
	}

	/**
	 * @test
	 */
	public function testReadPlaceReviewImage()
	{
		$placeReviewImage = $this->makePlaceReviewImage();
		$this->json('GET', '/api/v1/placeReviewImages/' . $placeReviewImage->id);

		$this->assertApiResponse($placeReviewImage->toArray());
	}

	/**
	 * @test
	 */
	public function testUpdatePlaceReviewImage()
	{
		$placeReviewImage = $this->makePlaceReviewImage();
		$editedPlaceReviewImage = $this->fakePlaceReviewImageData();

		$this->json('PUT', '/api/v1/placeReviewImages/' . $placeReviewImage->id, $editedPlaceReviewImage);

		$this->assertApiResponse($editedPlaceReviewImage);
	}

	/**
	 * @test
	 */
	public function testDeletePlaceReviewImage()
	{
		$placeReviewImage = $this->makePlaceReviewImage();
		$this->json('DELETE', '/api/v1/placeReviewImages/' . $placeReviewImage->id);

		$this->assertApiSuccess();
		$this->json('GET', '/api/v1/placeReviewImages/' . $placeReviewImage->id);

		$this->assertResponseStatus(404);
	}
}
