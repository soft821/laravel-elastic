<?php

use Faker\Factory as Faker;
use App\Models\PlaceMetaData;
use App\Repositories\PlaceMetaDataRepository;

trait MakePlaceMetaDataTrait
{
	/**
	 * Create fake instance of PlaceMetaData and save it in database
	 *
	 * @param array $placeMetaDataFields
	 * @return PlaceMetaData
	 */
	public function makePlaceMetaData($placeMetaDataFields = [])
	{
		/** @var PlaceMetaDataRepository $placeMetaDataRepo */
		$placeMetaDataRepo = App::make(PlaceMetaDataRepository::class);
		$theme = $this->fakePlaceMetaDataData($placeMetaDataFields);
		return $placeMetaDataRepo->create($theme);
	}

	/**
	 * Get fake instance of PlaceMetaData
	 *
	 * @param array $placeMetaDataFields
	 * @return PlaceMetaData
	 */
	public function fakePlaceMetaData($placeMetaDataFields = [])
	{
		return new PlaceMetaData($this->fakePlaceMetaDataData($placeMetaDataFields));
	}

	/**
	 * Get fake data of PlaceMetaData
	 *
	 * @param array $postFields
	 * @return array
	 */
	public function fakePlaceMetaDataData($placeMetaDataFields = [])
	{
		$fake = Faker::create();

		return array_merge([
			'place_id' => $fake->word,
			'key' => $fake->word,
			'value' => $fake->word,
			'value_long' => $fake->word
		], $placeMetaDataFields);
	}
}
