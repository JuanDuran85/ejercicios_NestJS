export interface ResourceAssetResponse {
    asset_id:             string;
    public_id:            string;
    format:               string;
    version:              number;
    resource_type:        string;
    type:                 string;
    created_at:           Date;
    bytes:                number;
    width:                number;
    height:               number;
    asset_folder:         string;
    display_name:         string;
    url:                  string;
    secure_url:           string;
    next_cursor:          string;
    derived:              any[];
    rate_limit_allowed:   number;
    rate_limit_reset_at:  Date;
    rate_limit_remaining: number;
}
