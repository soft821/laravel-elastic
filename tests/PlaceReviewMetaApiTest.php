<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PlaceReviewMetaApiTest extends TestCase
{
	use MakePlaceReviewMetaTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

	/**
	 * @test
	 */
	public function testCreatePlaceReviewMeta()
	{
		$placeReviewMeta = $this->fakePlaceReviewMetaData();
		$this->json('POST', '/api/v1/placeReviewMetas', $placeReviewMeta);

		$this->assertApiResponse($placeReviewMeta);
	}

	/**
	 * @test
	 */
	public function testReadPlaceReviewMeta()
	{
		$placeReviewMeta = $this->makePlaceReviewMeta();
		$this->json('GET', '/api/v1/placeReviewMetas/' . $placeReviewMeta->id);

		$this->assertApiResponse($placeReviewMeta->toArray());
	}

	/**
	 * @test
	 */
	public function testUpdatePlaceReviewMeta()
	{
		$placeReviewMeta = $this->makePlaceReviewMeta();
		$editedPlaceReviewMeta = $this->fakePlaceReviewMetaData();

		$this->json('PUT', '/api/v1/placeReviewMetas/' . $placeReviewMeta->id, $editedPlaceReviewMeta);

		$this->assertApiResponse($editedPlaceReviewMeta);
	}

	/**
	 * @test
	 */
	public function testDeletePlaceReviewMeta()
	{
		$placeReviewMeta = $this->makePlaceReviewMeta();
		$this->json('DELETE', '/api/v1/placeReviewMetas/' . $placeReviewMeta->id);

		$this->assertApiSuccess();
		$this->json('GET', '/api/v1/placeReviewMetas/' . $placeReviewMeta->id);

		$this->assertResponseStatus(404);
	}
}
