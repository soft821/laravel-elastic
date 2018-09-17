<?php

use Faker\Factory as Faker;
use App\Models\PlaceReview;
use App\Repositories\PlaceReviewRepository;

trait MakePlaceReviewTrait
{
	/**
	 * Create fake instance of PlaceReview and save it in database
	 *
	 * @param array $placeReviewFields
	 * @return PlaceReview
	 */
	public function makePlaceReview($placeReviewFields = [])
	{
		/** @var PlaceReviewRepository $placeReviewRepo */
		$placeReviewRepo = App::make(PlaceReviewRepository::class);
		$theme = $this->fakePlaceReviewData($placeReviewFields);
		return $placeReviewRepo->create($theme);
	}

	/**
	 * Get fake instance of PlaceReview
	 *
	 * @param array $placeReviewFields
	 * @return PlaceReview
	 */
	public function fakePlaceReview($placeReviewFields = [])
	{
		return new PlaceReview($this->fakePlaceReviewData($placeReviewFields));
	}

	/**
	 * Get fake data of PlaceReview
	 *
	 * @param array $postFields
	 * @return array
	 */
	public function fakePlaceReviewData($placeReviewFields = [])
	{
		$fake = Faker::create();

		return array_merge([
			'place_id' => $fake->word,
			'timestamp' => $fake->randomDigitNotNull,
			'user_id' => $fake->randomDigitNotNull,
			'mode' => $fake->word,
			'code' => $fake->word,
			'comment' => $fake->text,
			'_meta' => $fake->text,
			'_has_meta' => $fake->word,
			'watson_indexing' => $fake->word,
			'watson_indexed' => $fake->word,
			'_has_rev_photo' => $fake->word
		], $placeReviewFields);
	}
}
