
export interface GetCountiesResponse {
    location: County[];
}

export interface County {
    PortalId: number,
    LocationId: number,
    Latitude: number,
    Longitude: number,
    Title: string,
    Description: string,
    SortOrder: number,
    CreatedByUserId: number,
    CreatedOnDate: string,
    LastModifiedByUserId: number,
    LastModifiedOnDate: string
}
