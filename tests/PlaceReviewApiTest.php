<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PlaceReviewApiTest extends TestCase
{
	use MakePlaceReviewTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

	/**
	 * @test
	 */
	public function testCreatePlaceReview()
	{
		$placeReview = $this->fakePlaceReviewData();
		$this->json('POST', '/api/v1/placeReviews', $placeReview);

		$this->assertApiResponse($placeReview);
	}

	/**
	 * @test
	 */
	public function testReadPlaceReview()
	{
		$placeReview = $this->makePlaceReview();
		$this->json('GET', '/api/v1/placeReviews/' . $placeReview->id);

		$this->assertApiResponse($placeReview->toArray());
	}

	/**
	 * @test
	 */
	public function testUpdatePlaceReview()
	{
		$placeReview = $this->makePlaceReview();
		$editedPlaceReview = $this->fakePlaceReviewData();

		$this->json('PUT', '/api/v1/placeReviews/' . $placeReview->id, $editedPlaceReview);

		$this->assertApiResponse($editedPlaceReview);
	}

	/**
	 * @test
	 */
	public function testDeletePlaceReview()
	{
		$placeReview = $this->makePlaceReview();
		$this->json('DELETE', '/api/v1/placeReviews/' . $placeReview->id);

		$this->assertApiSuccess();
		$this->json('GET', '/api/v1/placeReviews/' . $placeReview->id);

		$this->assertResponseStatus(404);
	}
}
