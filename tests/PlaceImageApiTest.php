<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PlaceImageApiTest extends TestCase
{
	use MakePlaceImageTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

	/**
	 * @test
	 */
	public function testCreatePlaceImage()
	{
		$placeImage = $this->fakePlaceImageData();
		$this->json('POST', '/api/v1/placeImages', $placeImage);

		$this->assertApiResponse($placeImage);
	}

	/**
	 * @test
	 */
	public function testReadPlaceImage()
	{
		$placeImage = $this->makePlaceImage();
		$this->json('GET', '/api/v1/placeImages/' . $placeImage->id);

		$this->assertApiResponse($placeImage->toArray());
	}

	/**
	 * @test
	 */
	public function testUpdatePlaceImage()
	{
		$placeImage = $this->makePlaceImage();
		$editedPlaceImage = $this->fakePlaceImageData();

		$this->json('PUT', '/api/v1/placeImages/' . $placeImage->id, $editedPlaceImage);

		$this->assertApiResponse($editedPlaceImage);
	}

	/**
	 * @test
	 */
	public function testDeletePlaceImage()
	{
		$placeImage = $this->makePlaceImage();
		$this->json('DELETE', '/api/v1/placeImages/' . $placeImage->id);

		$this->assertApiSuccess();
		$this->json('GET', '/api/v1/placeImages/' . $placeImage->id);

		$this->assertResponseStatus(404);
	}
}
