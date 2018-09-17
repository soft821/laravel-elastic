<?php

use Faker\Factory as Faker;
use App\Models\PlaceMeta;
use App\Repositories\PlaceMetaRepository;

trait MakePlaceMetaTrait
{
	/**
	 * Create fake instance of PlaceMeta and save it in database
	 *
	 * @param array $placeMetaFields
	 * @return PlaceMeta
	 */
	public function makePlaceMeta($placeMetaFields = [])
	{
		/** @var PlaceMetaRepository $placeMetaRepo */
		$placeMetaRepo = App::make(PlaceMetaRepository::class);
		$theme = $this->fakePlaceMetaData($placeMetaFields);
		return $placeMetaRepo->create($theme);
	}

	/**
	 * Get fake instance of PlaceMeta
	 *
	 * @param array $placeMetaFields
	 * @return PlaceMeta
	 */
	public function fakePlaceMeta($placeMetaFields = [])
	{
		return new PlaceMeta($this->fakePlaceMetaData($placeMetaFields));
	}

	/**
	 * Get fake data of PlaceMeta
	 *
	 * @param array $postFields
	 * @return array
	 */
	public function fakePlaceMetaData($placeMetaFields = [])
	{
		$fake = Faker::create();

		return array_merge([
			'place_id' => $fake->word,
			'type' => $fake->word,
			'value' => $fake->word,
			'asset_src' => $fake->word,
			'asset_dl' => $fake->word
		], $placeMetaFields);
	}
}
