use tf2;

CREATE TABLE main (
    game VARCHAR(255) NOT NULL,
    profile_url VARCHAR(255) NOT NULL,
    PRIMARY KEY (profile_url)
);

CREATE TABLE classes_played (
    profile_url VARCHAR(255) NOT NULL,
    scout BOOLEAN NOT NULL,
    soldier BOOLEAN NOT NULL,
    pyro BOOLEAN NOT NULL,
    demoman BOOLEAN NOT NULL,
    heavy BOOLEAN NOT NULL,
    engineer BOOLEAN NOT NULL,
    medic BOOLEAN NOT NULL,
    sniper BOOLEAN NOT NULL,
    spy BOOLEAN NOT NULL,
    FOREIGN KEY (profile_url)
        REFERENCES main (profile_url)
);

CREATE TABLE type_of_cheats (
    profile_url VARCHAR(255) NOT NULL,
    esp BOOLEAN NOT NULL,
    aimbot BOOLEAN NOT NULL,
    crit BOOLEAN NOT NULL,
    no_spread BOOLEAN NOT NULL,
    lag_switch BOOLEAN NOT NULL,
    association BOOLEAN NOT NULL,
    FOREIGN KEY (profile_url)
        REFERENCES main (profile_url)
);

CREATE TABLE communications (
    profile_url VARCHAR(255) NOT NULL,
    mic BOOLEAN NOT NULL,
    text_chat BOOLEAN NOT NULL,
    is_racist BOOLEAN NOT NULL,
	types_1 BOOLEAN NOT NULL,
    types_question_mark BOOLEAN NOT NULL,
    binds BOOLEAN NOT NULL,
    FOREIGN KEY (profile_url)
        REFERENCES main (profile_url)
);

CREATE TABLE account_info (
    profile_url VARCHAR(255) NOT NULL,
    burner_acc BOOLEAN NOT NULL,
    main_acc BOOLEAN NOT NULL,
    vac_ban BOOLEAN NOT NULL,
    trade_ban BOOLEAN NOT NULL,
    community_ban BOOLEAN NOT NULL,
    private_profile BOOLEAN NOT NULL,
	acc_age VARCHAR(255) NOT NULL,
	game_hours INT,
	steam_level INT,
    FOREIGN KEY (profile_url)
        REFERENCES main (profile_url)
);

CREATE TABLE game_behavior (
    profile_url VARCHAR(255) NOT NULL,
	in_party BOOLEAN NOT NULL,
    won_game BOOLEAN NOT NULL,
    lost_game BOOLEAN NOT NULL,
    was_kicked BOOLEAN NOT NULL,
    kicks_others BOOLEAN NOT NULL,
    hvh BOOLEAN NOT NULL,
    FOREIGN KEY (profile_url)
        REFERENCES main (profile_url)
);

CREATE TABLE notes (
    profile_url VARCHAR(255) NOT NULL,
    notes TEXT,
    FOREIGN KEY (profile_url)
        REFERENCES main (profile_url)
);

CREATE TABLE profile_info (
    profile_url VARCHAR(255) NOT NULL,
    has_unusuals BOOLEAN NOT NULL,
    has_australiums BOOLEAN NOT NULL,
    edgy_hacker_profile BOOLEAN NOT NULL,
    cheater_steam_group BOOLEAN NOT NULL,
    pronouns BOOLEAN NOT NULL,
    disables_comments BOOLEAN NOT NULL,
    responds_comments BOOLEAN NOT NULL,
    deletes_comments BOOLEAN NOT NULL,
	is_furry BOOLEAN NOT NULL,
    is_brony BOOLEAN NOT NULL,
    is_lgbt BOOLEAN NOT NULL,
    anime BOOLEAN NOT NULL,
    hentai BOOLEAN NOT NULL,
    salt BOOLEAN NOT NULL,
    displays_accusations BOOLEAN NOT NULL,
    pc_specs BOOLEAN NOT NULL,
    denies_cheating BOOLEAN NOT NULL,
    brags_cheating BOOLEAN NOT NULL,
    has_youtube BOOLEAN NOT NULL,
    has_twitch BOOLEAN NOT NULL,
    FOREIGN KEY (profile_url)
        REFERENCES main (profile_url)
);
