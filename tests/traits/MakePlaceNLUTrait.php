<?php

use Faker\Factory as Faker;
use App\Models\PlaceNLU;
use App\Repositories\PlaceNLURepository;

trait MakePlaceNLUTrait
{
	/**
	 * Create fake instance of PlaceNLU and save it in database
	 *
	 * @param array $placeNLUFields
	 * @return PlaceNLU
	 */
	public function makePlaceNLU($placeNLUFields = [])
	{
		/** @var PlaceNLURepository $placeNLURepo */
		$placeNLURepo = App::make(PlaceNLURepository::class);
		$theme = $this->fakePlaceNLUData($placeNLUFields);
		return $placeNLURepo->create($theme);
	}

	/**
	 * Get fake instance of PlaceNLU
	 *
	 * @param array $placeNLUFields
	 * @return PlaceNLU
	 */
	public function fakePlaceNLU($placeNLUFields = [])
	{
		return new PlaceNLU($this->fakePlaceNLUData($placeNLUFields));
	}

	/**
	 * Get fake data of PlaceNLU
	 *
	 * @param array $postFields
	 * @return array
	 */
	public function fakePlaceNLUData($placeNLUFields = [])
	{
		$fake = Faker::create();

		return array_merge([
			'place_id' => $fake->randomDigitNotNull,
			'nlu' => $fake->word,
			'photos' => $fake->text
		], $placeNLUFields);
	}
}
