<?php

use Faker\Factory as Faker;
use App\Models\PlaceImage;
use App\Repositories\PlaceImageRepository;

trait MakePlaceImageTrait
{
	/**
	 * Create fake instance of PlaceImage and save it in database
	 *
	 * @param array $placeImageFields
	 * @return PlaceImage
	 */
	public function makePlaceImage($placeImageFields = [])
	{
		/** @var PlaceImageRepository $placeImageRepo */
		$placeImageRepo = App::make(PlaceImageRepository::class);
		$theme = $this->fakePlaceImageData($placeImageFields);
		return $placeImageRepo->create($theme);
	}

	/**
	 * Get fake instance of PlaceImage
	 *
	 * @param array $placeImageFields
	 * @return PlaceImage
	 */
	public function fakePlaceImage($placeImageFields = [])
	{
		return new PlaceImage($this->fakePlaceImageData($placeImageFields));
	}

	/**
	 * Get fake data of PlaceImage
	 *
	 * @param array $postFields
	 * @return array
	 */
	public function fakePlaceImageData($placeImageFields = [])
	{
		$fake = Faker::create();

		return array_merge([
			'place_id' => $fake->randomDigitNotNull,
			'path' => $fake->word,
			'sid' => $fake->randomDigitNotNull,
			'analyzed' => $fake->word,
			'is_photo' => $fake->word,
			'colors' => $fake->word
		], $placeImageFields);
	}
}
