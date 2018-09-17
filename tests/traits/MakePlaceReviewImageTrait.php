<?php

use Faker\Factory as Faker;
use App\Models\PlaceReviewImage;
use App\Repositories\PlaceReviewImageRepository;

trait MakePlaceReviewImageTrait
{
	/**
	 * Create fake instance of PlaceReviewImage and save it in database
	 *
	 * @param array $placeReviewImageFields
	 * @return PlaceReviewImage
	 */
	public function makePlaceReviewImage($placeReviewImageFields = [])
	{
		/** @var PlaceReviewImageRepository $placeReviewImageRepo */
		$placeReviewImageRepo = App::make(PlaceReviewImageRepository::class);
		$theme = $this->fakePlaceReviewImageData($placeReviewImageFields);
		return $placeReviewImageRepo->create($theme);
	}

	/**
	 * Get fake instance of PlaceReviewImage
	 *
	 * @param array $placeReviewImageFields
	 * @return PlaceReviewImage
	 */
	public function fakePlaceReviewImage($placeReviewImageFields = [])
	{
		return new PlaceReviewImage($this->fakePlaceReviewImageData($placeReviewImageFields));
	}

	/**
	 * Get fake data of PlaceReviewImage
	 *
	 * @param array $postFields
	 * @return array
	 */
	public function fakePlaceReviewImageData($placeReviewImageFields = [])
	{
		$fake = Faker::create();

		return array_merge([
			'place_review_id' => $fake->randomDigitNotNull,
			'place_id' => $fake->randomDigitNotNull,
			'text' => $fake->word,
			'path' => $fake->word,
			'src' => $fake->word
		], $placeReviewImageFields);
	}
}
