<?php

use Faker\Factory as Faker;
use App\Models\Place;
use App\Repositories\PlaceRepository;

trait MakePlaceTrait
{
	/**
	 * Create fake instance of Place and save it in database
	 *
	 * @param array $placeFields
	 * @return Place
	 */
	public function makePlace($placeFields = [])
	{
		/** @var PlaceRepository $placeRepo */
		$placeRepo = App::make(PlaceRepository::class);
		$theme = $this->fakePlaceData($placeFields);
		return $placeRepo->create($theme);
	}

	/**
	 * Get fake instance of Place
	 *
	 * @param array $placeFields
	 * @return Place
	 */
	public function fakePlace($placeFields = [])
	{
		return new Place($this->fakePlaceData($placeFields));
	}

	/**
	 * Get fake data of Place
	 *
	 * @param array $postFields
	 * @return array
	 */
	public function fakePlaceData($placeFields = [])
	{
		$fake = Faker::create();

		return array_merge([
			'name' => $fake->company,
			'lat' => $fake->randomDigitNotNull,
			'lng' => $fake->randomDigitNotNull,
			'jsg_id' => $fake->sha256,
			'jsfb_id' => $fake->iu,
			'jsfa_id' => $fake->word,
			'jsfs_id' => $fake->word,
			'jsyelp_id' => $fake->word,
			'jsta_id' => $fake->word,
			'domain' => $fake->domainName,
			'domain_indexed' => $fake->randomNumber(),
			'url_src' => $fake->word,
			'url_redir' => $fake->word,
			'domain_path' => $fake->word,
			'merge_complete' => $fake->word,
			'place_analyzed' => $fake->word
		], $placeFields);
	}
}
