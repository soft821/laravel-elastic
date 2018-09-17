<?php

use Faker\Factory as Faker;
use App\Models\PlaceReviewMeta;
use App\Repositories\PlaceReviewMetaRepository;

trait MakePlaceReviewMetaTrait
{
	/**
	 * Create fake instance of PlaceReviewMeta and save it in database
	 *
	 * @param array $placeReviewMetaFields
	 * @return PlaceReviewMeta
	 */
	public function makePlaceReviewMeta($placeReviewMetaFields = [])
	{
		/** @var PlaceReviewMetaRepository $placeReviewMetaRepo */
		$placeReviewMetaRepo = App::make(PlaceReviewMetaRepository::class);
		$theme = $this->fakePlaceReviewMetaData($placeReviewMetaFields);
		return $placeReviewMetaRepo->create($theme);
	}

	/**
	 * Get fake instance of PlaceReviewMeta
	 *
	 * @param array $placeReviewMetaFields
	 * @return PlaceReviewMeta
	 */
	public function fakePlaceReviewMeta($placeReviewMetaFields = [])
	{
		return new PlaceReviewMeta($this->fakePlaceReviewMetaData($placeReviewMetaFields));
	}

	/**
	 * Get fake data of PlaceReviewMeta
	 *
	 * @param array $postFields
	 * @return array
	 */
	public function fakePlaceReviewMetaData($placeReviewMetaFields = [])
	{
		$fake = Faker::create();

		return array_merge([
			'place_review_id' => $fake->randomDigitNotNull,
			'place_id' => $fake->randomDigitNotNull,
			'data' => $fake->text
		], $placeReviewMetaFields);
	}
}
