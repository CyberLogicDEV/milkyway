export interface PersonDto {
    message: string,
    result: {
        properties: {
            height: string,
            mass: string,
            hair_color: string,
            skin_color: string,
            eye_color: string,
            birth_year: string,
            gender: string,
            created: string,
            edited: string,
            name: string,
            homeworld: string,
            url: string
        },
        description: string,
        _id: string,
        uid: string,
        __v: number
    }
}

export interface StarshipDto {
    message: string,
    result: {
        properties: {
            model: string,
            starship_class: string,
            manufacturer: string,
            cost_in_credits: string,
            length: string,
            crew: string,
            passengers: string,
            max_atmosphering_speed: string,
            hyperdrive_rating: string,
            MGLT: string,
            cargo_capacity: string,
            consumables: string,
            pilots: string[],
            created: string,
            edited: string,
            name: string,
            url: string
        },
        description: string,
        _id: string,
        uid: string,
        __v: number
    }
}

export interface PlayerListDto {
    message: string,
    total_records: number,
    total_pages: number,
    previous: string,
    next: string,
    results: PlayerListResult[],
}

interface PlayerListResult {
    uid: string,
    name: string,
    url: string,
}