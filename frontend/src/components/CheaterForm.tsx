import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import './CheaterForm.css';
import { TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, TextareaAutosize, Button, SelectChangeEvent, Divider, Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { AlertColor } from '@mui/material/Alert'; // Import the AlertColor type

interface CheaterFormData {
    game: string;
    profile_url: string;
    scout: boolean;
    soldier: boolean;
    pyro: boolean;
    demoman: boolean;
    heavy: boolean;
    engineer: boolean;
    medic: boolean;
    sniper: boolean;
    spy: boolean;
    esp: boolean;
    aimbot: boolean;
    crit: boolean;
    no_spread: boolean;
    lag_switch: boolean;
    association: boolean;
    mic: boolean;
    text_chat: boolean;
    is_racist: boolean;
    types_1: boolean;
    types_question_mark: boolean;
    binds: boolean;
    burner_acc: boolean;
    main_acc: boolean;
    vac_ban: boolean;
    trade_ban: boolean;
    community_ban: boolean;
    private_profile: boolean;
    acc_age: number;
    game_hours?: number;
    steam_level: number;
    in_party: boolean;
    won_game: boolean;
    lost_game: boolean;
    was_kicked: boolean;
    kicks_others: boolean;
    hvh: boolean;
    notes: string;
    has_unusuals: boolean;
    has_australiums: boolean;
    edgy_hacker_profile: boolean;
    cheater_steam_group: boolean;
    pronouns: boolean;
    disables_comments: boolean;
    responds_comments: boolean;
    deletes_comments: boolean;
    is_furry: boolean;
    is_brony: boolean;
    is_lgbt: boolean;
    anime: boolean;
    hentai: boolean;
    salt: boolean;
    displays_accusations: boolean;
    pc_specs: boolean;
    denies_cheating: boolean;
    brags_cheating: boolean;
    has_youtube: boolean;
    has_twitch: boolean;
    country?: string;
    num_vac_bans: number,
    days_since_last_ban: number,
    num_game_bans: number,
}

interface Notification {
    message: string;
    type: AlertColor | undefined; // Use AlertColor type here
}

const CheaterForm: React.FC = () => {
    const [formData, setFormData] = useState<CheaterFormData>({
        game: 'Team Fortress 2', // default value or could be empty
        profile_url: '',
        scout: false,
        soldier: false,
        pyro: false,
        demoman: false,
        heavy: false,
        engineer: false,
        medic: false,
        sniper: false,
        spy: false,
        esp: false,
        aimbot: false,
        crit: false,
        no_spread: false,
        lag_switch: false,
        association: false,
        mic: false,
        text_chat: false,
        is_racist: false,
        types_1: false,
        types_question_mark: false,
        binds: false,
        burner_acc: false,
        main_acc: false,
        vac_ban: false,
        trade_ban: false,
        community_ban: false,
        private_profile: false,
        acc_age: 0,
        game_hours: 0,
        steam_level: 0,
        in_party: false,
        won_game: false,
        lost_game: false,
        was_kicked: false,
        kicks_others: false,
        hvh: false,
        notes: '',
        has_unusuals: false,
        has_australiums: false,
        edgy_hacker_profile: false,
        cheater_steam_group: false,
        pronouns: false,
        disables_comments: false,
        responds_comments: false,
        deletes_comments: false,
        is_furry: false,
        is_brony: false,
        is_lgbt: false,
        anime: false,
        hentai: false,
        salt: false,
        displays_accusations: false,
        pc_specs: false,
        denies_cheating: false,
        brags_cheating: false,
        has_youtube: false,
        has_twitch: false,
        country: 'N/A',
        num_vac_bans: 0,
        days_since_last_ban: 0,
        num_game_bans: 0,
    });

    const [notification, setNotification] = useState<Notification>({ message: '', type: undefined });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
        // Replace with your backend endpoint
        const response = await axios.post('http://localhost:5000/add-cheater', formData);
        console.log('Form submitted:', response.data);
        setNotification({ message: 'Entry added successfully', type: 'success' });
        // Handle additional success actions if needed
        } catch (error: any) {
        console.error('Error submitting form:', error);
        setNotification({ message: error.response.data || 'Error adding entry', type: 'error' });
        // Handle error actions if needed
        }
    };

    let steamId = ''; // Variable to store extracted ID or vanity URL
    let [profileURL, setProfileURL] = useState('');
    let [avatarURL, setAvatarURL] = useState('');
    let [accountCreationDate, setAccountCreationDate] = useState(0);
    let [displayName, setDisplayName] = useState('');
    let [profilePrivacyInt, setProfilePrivacyInt] = useState(0);
    let [profilePrivacy, setProfilePrivacy] = useState(false);
    let [commentsStatusInt, setCommentsStatusInt] = useState(0);
    let [commentsStatus, setCommentsStatus] = useState('');
    let [country, setCountry] = useState('');
    let [steamLevel, setSteamLevel] = useState(0);
    let [vacBanStatus, setVacBanStatus] = useState(false);
    let [numVacBans, setNumVacBans] = useState(0);
    let [tradeBanStatus, setTradeBanStatus] = useState(false);
    let [numGameBans, setNumGameBans] = useState(0);
    let [daysSinceBan, setDaysSinceBan] = useState(0);
    let [communityBanStatus, setCommunityBanStatus] = useState(false);
    let [gameHours, setGameHours] = useState(0);

    const handleFetchSteamProfile = async () => {
        // Extracting the ID or Vanity URL from the input
        const urlPattern = /steamcommunity\.com\/(id|profiles)\/([a-zA-Z0-9]+)/;
        const match = formData.profile_url.match(urlPattern);
    
        if (match && match[2]) {
        steamId = match[2];
        } else {
        // Handle invalid URL
        console.error('Invalid URL');
        return;
        }
        try {
            const response = await fetch(`http://localhost:5000/getSteamUserData?input=${steamId}`); // here, steamId can be either the vanityID or the actual steamID
            const data = await response.json();
            // save the player object in a new var so i dont have to fuckin tyep dATa.REspsonse.playERS[0] all the time
            var profile = data.profileData.response.players[0];
            var bans = data.banData.players[0];
            var level = data.steamLevelData.response.player_level;
            var games = data.allGamesData.response.games;

            var profileURL = data.profileURL;
            console.log('profile url on the frontend: ' + profileURL);

            avatarURL = profile.avatarfull;
            setAvatarURL(avatarURL);
            console.log(`Avatar URL: ${avatarURL}`)

            accountCreationDate = convertUnixTimeToYear(profile.timecreated);
            if (accountCreationDate) {
                setAccountCreationDate(accountCreationDate);
                console.log(`Account created: ${accountCreationDate}`);
            }
            displayName = profile.personaname;
            setDisplayName(displayName);
            console.log(`Display name: ${displayName}`)

            profilePrivacyInt = profile.communityvisibilitystate;
            if (profilePrivacyInt == 3) {
                profilePrivacy = false;
                setProfilePrivacy(profilePrivacy);
                console.log('Profile privacy: public')
            } else {
                profilePrivacy = true;
                setProfilePrivacy(profilePrivacy);
                console.log('Profile privacy: private')
            }

            commentsStatusInt = profile.commentpermission;
            if (commentsStatusInt == 1) {
                commentsStatus = 'enabled';
                setCommentsStatus(commentsStatus);
                console.log('Profile comments: enabled')
            } else {
                commentsStatus = 'disabled';
                setCommentsStatus(commentsStatus);
                console.log('Profile comments: disabled')
            }

            if (profile.loccountrycode) {
                country = profile.loccountrycode;
                setCountry(country);
                console.log(`Country: ${country}`);
            }

            vacBanStatus = bans.VACBanned;
            if (!vacBanStatus) {
                setVacBanStatus(vacBanStatus);
                console.log('VAC Ban Status: clean'); 
            } else {
                setVacBanStatus(vacBanStatus);
                console.log('VAC Ban Status: banned!')
            }
            let tradeBanStatusProxy = bans.EconomyBan;
            if (tradeBanStatusProxy == 'none') {
                setTradeBanStatus(false);
                console.log('Trade Ban Status: clean')
            } else {
                setTradeBanStatus(true);
                console.log(`Trade Ban Status: ${tradeBanStatus}`)
            }
            communityBanStatus = bans.CommunityBanned;
            if (!communityBanStatus) {
                setCommunityBanStatus(communityBanStatus);
                console.log('Community Ban Status: clean');
            } else {
                setCommunityBanStatus(communityBanStatus);
                console.log('Community Ban Status: banned!')
            }
            numGameBans = bans.NumberOfGameBans;
            setNumGameBans(numGameBans);
            console.log(`Number of Game Bans: ${numGameBans}`);

            numVacBans = bans.NumberOfVACBans;
            setNumVacBans(numVacBans);
            console.log(`Number of VACations: ${numVacBans}`);

            daysSinceBan = bans.DaysSinceLastBan;
            setDaysSinceBan(daysSinceBan);
            console.log(`Days Since Last Ban: ${daysSinceBan}`);

            steamLevel = level;
            setSteamLevel(steamLevel);
            console.log(`Steam level: ${steamLevel}`)

            if (games) {
                const gametf2 = games.find((game: { appid: number; }) => game.appid === 440);
                if (gametf2) {
                    let gameHours = convertMinutesToHours(gametf2.playtime_forever);
                    setGameHours(gameHours);
                    console.log('Total Hours Played: ' + gameHours);
                }
            }



            setProfileURL(profileURL);

            setFormData({
                ...formData,
                profile_url: profileURL,
                acc_age: accountCreationDate,
                num_vac_bans: numVacBans,
                num_game_bans: numGameBans,
                days_since_last_ban: daysSinceBan,
                game_hours: gameHours,
                steam_level: steamLevel,
                ...(country !== undefined && { country: country }),
                vac_ban: vacBanStatus,
                trade_ban: tradeBanStatus,
                community_ban: communityBanStatus,
                private_profile: profilePrivacy,
            });
            setNotification({ message: 'Profile data fetched and autofilled successfully!', type: 'success' });

        } catch (error) {
            console.error('Error fetching Steam profile:', error);
        }
    };

    function convertUnixTimeToYear(unixTime: number): number {
        // Convert unix time to milliseconds and create a Date object
        const date = new Date(unixTime * 1000);
        // Extract year
        const year = date.getFullYear();
        return year;
    };

    function convertMinutesToHours(minutes: number): number {
        const hours = Math.floor(minutes / 60);
        return hours;
    }

    const defaultAvatar = 'default-avatar.jpg';
    const defaultName = 'No Profile Data';
    const defaultPrivacy = 'N/A'
    const defaultSteamLevel = 0;
    const defaultCountry = 'No country provided.';

    const getPrivacyStyle = (privacy: boolean) => {
        switch (privacy) {
            case false:
                return { fontWeight: 'bold', color: 'limegreen' };
            case true:
                return { fontWeight: 'normal', color: 'red' };
            default:
                return { fontWeight: 'normal', color: 'grey' };
        }
    };
    const isPrivate = (privacy: boolean): string => {
        if (privacy) {
            return 'private'
        } else if (!privacy) {
            return 'public'
        } else {
            return 'N/A'
        }
    };
    return (
    <div>
    <form onSubmit={handleSubmit} style={{padding: '30px', maxWidth: '900px'}}>

        <div style={{display: 'flex', alignItems: 'center'}}>
            <img src='me.png' style={{width: 'auto', height: '60px', display: 'none'}}/>
            <div>
                <h3 style={{margin: '5px 0'}}>Biscuit's Mega Cheater Database</h3>
                <p style={{color: 'grey', fontSize: '16px', marginTop: '0px'}}>Enter cheater information below</p>
            </div>
        </div>

        <FormControl fullWidth margin="normal" 
            sx={{
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'transparent',
                    transition: '0.2s'
                },
                '&:hover fieldset': {
                    borderColor: 'azure', // color when hovered
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'dodgerblue', // color when focused
                },
            },
        }}>
        <InputLabel sx={{color: 'white'}}>Game</InputLabel>
        <Select name="game" variant='outlined' value={formData.game} onChange={handleSelectChange} label="Game" sx={{color: 'white', backgroundColor: '#282c34', marginTop: '0px'}}>
            <MenuItem value="Team Fortress 2">Team Fortress 2</MenuItem>
            {/* Add more game options here */}
        </Select>
        </FormControl>

        {/* Main Header */}
        <div style={{display: 'flex', alignItems: 'center'}}>
            <TextField
            label="Profile URL"
            name="profile_url"
            value={formData.profile_url}
            onChange={handleInputChange}
            margin="normal"
            variant='filled'
            sx={{
                flex: 4,
                margin: '5px 0px 5px 0px',
                '& .MuiFilledInput-root': {
                    backgroundColor: '#282c34', // Change this to your desired background color
                    '&:hover': {
                    backgroundColor: '#14161a', // Slightly darker on hover
                    },
                    '&.Mui-focused': {
                    backgroundColor: '#14161a', // Even darker when focused
                    },
                },
                '& .MuiFilledInput-input': {
                    color: 'white', // Text color
                },
                '& .MuiInputLabel-filled': {
                    color: 'gray', // Label color
                },
                '& .MuiInputLabel-filled.Mui-focused': {
                    color: 'white', // Label color when focused
                },
                '& .MuiFilledInput-underline:before': {
                    borderBottomColor: 'transparent', // Hide underline in normal state
                },
                '& .MuiFilledInput-underline:after': {
                    borderBottomColor: 'white', // Underline color when focused
                }
                }}
            fullWidth
            />
            <Button onClick={handleFetchSteamProfile} variant="contained" color="primary" style={{flex: 1, padding: '15px', marginLeft: '10px'}}>
                <p style={{margin: 0, padding: 0, textDecoration: 'none'}}>Fetch Profile Data</p>
            </Button>
        </div>

        {/* Profile Preview */}
        <div style={{display: 'flex', width: '100%', padding: '10px'}}>
            <img src={avatarURL || defaultAvatar} style={{height: '80px', borderRadius: '5px'}} />
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: '12px', marginTop: '8px'}}>
                <p style={{margin: 0, fontSize: '28px', fontWeight: 600, marginBottom: '2px'}}>{displayName || defaultName}</p>
                <p style={{margin: 0, fontSize: '18px'}}>
                    Privacy: <span style={getPrivacyStyle(profilePrivacy)}>{isPrivate(profilePrivacy) || defaultPrivacy}</span>
                </p>
                {/* <p style={{margin: 0, fontSize: '18px'}}>Country: {flagEmoji || defaultCountry}</p> */}
            </div>
        </div>

        {/* Type of cheats */}
        <div className='checkbox-container'>
            <h5>Type of Cheats</h5>
            <p className='description'>Select up to 5 options or cheater association</p>
            <div style={{display: 'flex'}}>
                <FormControlLabel
                control={
                    <Checkbox 
                    sx={{
                        color: 'white',
                        '&.Mui-checked': {
                            color: 'limegreen', // Color when checked
                        },
                    }} 
                    name="esp" 
                    checked={formData.esp} 
                    onChange={handleInputChange} />
                }
                label="ESP"
                />
                <FormControlLabel
                control={
                    <Checkbox 
                    sx={{
                        color: 'white',
                        '&.Mui-checked': {
                            color: 'limegreen', // Color when checked
                        },
                    }} 
                    name="aimbot" 
                    checked={formData.aimbot} 
                    onChange={handleInputChange} />
                }
                label="Aimbot"
                />
                <FormControlLabel
                control={
                    <Checkbox 
                    sx={{
                        color: 'white',
                        '&.Mui-checked': {
                            color: 'limegreen', // Color when checked
                        },
                    }} 
                    name="crit" 
                    checked={formData.crit} 
                    onChange={handleInputChange} />
                }
                label="Critical Hits"
                />
                <FormControlLabel
                control={
                    <Checkbox 
                    sx={{
                        color: 'white',
                        '&.Mui-checked': {
                            color: 'limegreen', // Color when checked
                        },
                    }} 
                    name="no_spread" 
                    checked={formData.no_spread} 
                    onChange={handleInputChange} />
                }
                label="No Spread"
                />
                <FormControlLabel
                control={
                    <Checkbox 
                    sx={{
                        color: 'white',
                        '&.Mui-checked': {
                            color: 'limegreen', // Color when checked
                        },
                    }} 
                    name="lag_switch" 
                    checked={formData.lag_switch} 
                    onChange={handleInputChange} />
                }
                label="Lag Switch"
                />
                <Divider orientation="vertical" flexItem style={{borderColor: '#999', marginRight: '15px', fontSize: '12px'}}
                    sx={{
                        '&:before, &:after': {
                            height: '5px',
                            border: '1px orange solid'
                        }
                    }}
                >
                    OR
                </Divider>
                <FormControlLabel
                control={
                    <Checkbox 
                    sx={{
                        color: 'white',
                        '&.Mui-checked': {
                            color: 'limegreen', // Color when checked
                        },
                    }} 
                    name="association" 
                    checked={formData.association} 
                    onChange={handleInputChange} />
                }
                label="Cheater Association"
                />
            </div>
        </div>
        
        {/* Communication */}
        <div className='checkbox-container'>
            <h5>Communication</h5>
            <p className='description'>Select at least 0 options</p>
            <FormControlLabel
                control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="mic" 
                checked={formData.mic} 
                onChange={handleInputChange} />
            }
            label="Uses Mic"
            />
            <FormControlLabel
                control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="text_chat" 
                checked={formData.text_chat} 
                onChange={handleInputChange} />
                }
                label="Uses Text Chat"
            />
            <FormControlLabel
                control={
                    <Checkbox 
                    sx={{
                        color: 'white',
                        '&.Mui-checked': {
                            color: 'limegreen', // Color when checked
                        },
                    }} 
                    name="is_racist" 
                    checked={formData.is_racist} 
                    onChange={handleInputChange} />
                }
                label="Says something racist"
            />
            <FormControlLabel
                control={
                    <Checkbox 
                    sx={{
                        color: 'white',
                        '&.Mui-checked': {
                            color: 'limegreen', // Color when checked
                        },
                    }} 
                    name="types_1" 
                    checked={formData.types_1} 
                    onChange={handleInputChange} />
                }
                label="Types '1'"
            />
            <FormControlLabel
                control={
                    <Checkbox 
                    sx={{
                        color: 'white',
                        '&.Mui-checked': {
                            color: 'limegreen', // Color when checked
                        },
                    }} 
                    name="types_question_mark" 
                    checked={formData.types_question_mark} 
                    onChange={handleInputChange} />
                }
                label="Types '?'"
            />
            <FormControlLabel
                control={
                    <Checkbox 
                    sx={{
                        color: 'white',
                        '&.Mui-checked': {
                            color: 'limegreen', // Color when checked
                        },
                    }} 
                    name="binds" 
                    checked={formData.binds} 
                    onChange={handleInputChange} />
                }
                label="Spams Binds"
            />
        </div>

        {/* Classes played */}
        <div className='checkbox-container'>
            <h5>Classes Played</h5>
            <p className='description'>Select up to 9 options</p>
            <FormControlLabel
                control={
                <Checkbox 
                    sx={{
                        color: 'white',
                        '&.Mui-checked': {
                            color: 'limegreen', // Color when checked
                        },
                    }} 
                    name="scout" 
                    checked={formData.scout} 
                    onChange={handleInputChange} />
                }
            label="Scout"
            />
            <FormControlLabel
                control={
                    <Checkbox 
                        sx={{
                            color: 'white',
                            '&.Mui-checked': {
                                color: 'limegreen', // Color when checked
                            },
                        }} 
                        name="soldier" 
                        checked={formData.soldier} 
                        onChange={handleInputChange} />
                }
                label="Soldier"
            />
            <FormControlLabel
                control={
                    <Checkbox 
                        sx={{
                            color: 'white',
                            '&.Mui-checked': {
                                color: 'limegreen', // Color when checked
                            },
                        }} 
                        name="pyro" 
                        checked={formData.pyro} 
                        onChange={handleInputChange}
                    />
                }
                label="Pyro"
            />
            <FormControlLabel
                control={
                    <Checkbox 
                        sx={{
                            color: 'white',
                            '&.Mui-checked': {
                                color: 'limegreen', // Color when checked
                            },
                        }} 
                        name="demoman" 
                        checked={formData.demoman} 
                        onChange={handleInputChange}
                    />
                }
                label="Demoman"
            />
            <FormControlLabel
                control={
                    <Checkbox 
                        sx={{
                            color: 'white',
                            '&.Mui-checked': {
                                color: 'limegreen', // Color when checked
                            },
                        }} 
                        name="heavy" 
                        checked={formData.heavy} 
                        onChange={handleInputChange}
                    />
                }
                label="Heavy"
            />
            <FormControlLabel
                control={
                    <Checkbox 
                        sx={{
                            color: 'white',
                            '&.Mui-checked': {
                                color: 'limegreen', // Color when checked
                            },
                        }} 
                        name="engineer" 
                        checked={formData.engineer} 
                        onChange={handleInputChange}
                    />
                }
                label="Engineer"
            />
            <FormControlLabel
                control={
                    <Checkbox 
                        sx={{
                            color: 'white',
                            '&.Mui-checked': {
                                color: 'limegreen', // Color when checked
                            },
                        }} 
                        name="medic" 
                        checked={formData.medic} 
                        onChange={handleInputChange}
                    />
                }
                label="Medic"
            />
            <FormControlLabel
                control={
                    <Checkbox 
                        sx={{
                            color: 'white',
                            '&.Mui-checked': {
                                color: 'limegreen', // Color when checked
                            },
                        }} 
                        name="sniper" 
                        checked={formData.sniper} 
                        onChange={handleInputChange}
                    />
                }
                label="Sniper"
            />
            <FormControlLabel
                control={
                    <Checkbox 
                        sx={{
                            color: 'white',
                            '&.Mui-checked': {
                                color: 'limegreen', // Color when checked
                            },
                        }} 
                        name="spy" 
                        checked={formData.spy} 
                        onChange={handleInputChange}
                    />
                }
                label="Spy"
            />
        </div>

        {/* Account Information */}
        <div className='checkbox-container'>
            <h5>Account Information</h5>
            <p className='description'>Note: if their profile is private then it's their main account.</p>
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="burner_acc" 
                checked={formData.burner_acc} 
                onChange={handleInputChange} />
            }
            label="Burner Account"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="main_acc" 
                checked={formData.main_acc} 
                onChange={handleInputChange} />
            }
            label="Main Account"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="vac_ban" 
                checked={formData.vac_ban} 
                onChange={handleInputChange} />
            }
            label="VAC Banned"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="trade_ban" 
                checked={formData.trade_ban} 
                onChange={handleInputChange} />
            }
            label="Trade Banned"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="community_ban" 
                checked={formData.community_ban} 
                onChange={handleInputChange} />
            }
            label="Community Banned"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="private_profile" 
                checked={formData.private_profile} 
                onChange={handleInputChange} />
            }
            label="Private Profile"
            />
            <TextField
            label="Account Creation Date"
            name="acc_age"
            value={formData.acc_age}
            onChange={handleInputChange}
            margin="normal"
            variant='filled'
            sx={{
                margin: '5px 0px 8px 0px',
                '& .MuiFilledInput-root': {
                    backgroundColor: '#282c34', // Change this to your desired background color
                    '&:hover': {
                    backgroundColor: '#14161a', // Slightly darker on hover
                    },
                    '&.Mui-focused': {
                    backgroundColor: '#14161a', // Even darker when focused
                    },
                },
                '& .MuiFilledInput-input': {
                    color: 'white', // Text color
                },
                '& .MuiInputLabel-filled': {
                    color: 'gray', // Label color
                },
                '& .MuiInputLabel-filled.Mui-focused': {
                    color: 'white', // Label color when focused
                },
                '& .MuiFilledInput-underline:before': {
                    borderBottomColor: 'transparent', // Hide underline in normal state
                },
                '& .MuiFilledInput-underline:after': {
                    borderBottomColor: 'white', // Underline color when focused
                }
                }}
            fullWidth
            />
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextField
                label="Number of VAC Bans"
                name="num_vac_bans"
                value={formData.num_vac_bans}
                onChange={handleInputChange}
                margin="normal"
                variant='filled'
                sx={{
                    margin: '5px 0px 8px 0px',
                    flex: 1,
                    '& .MuiFilledInput-root': {
                        backgroundColor: '#282c34', // Change this to your desired background color
                        '&:hover': {
                        backgroundColor: '#14161a', // Slightly darker on hover
                        },
                        '&.Mui-focused': {
                        backgroundColor: '#14161a', // Even darker when focused
                        },
                    },
                    '& .MuiFilledInput-input': {
                        color: 'white', // Text color
                    },
                    '& .MuiInputLabel-filled': {
                        color: 'gray', // Label color
                    },
                    '& .MuiInputLabel-filled.Mui-focused': {
                        color: 'white', // Label color when focused
                    },
                    '& .MuiFilledInput-underline:before': {
                        borderBottomColor: 'transparent', // Hide underline in normal state
                    },
                    '& .MuiFilledInput-underline:after': {
                        borderBottomColor: 'white', // Underline color when focused
                    }
                    }}
                />
                <TextField
                label="Number of Game Bans"
                name="num_game_bans"
                value={formData.num_game_bans}
                onChange={handleInputChange}
                margin="normal"
                variant='filled'
                sx={{
                    margin: '5px 8px 8px 8px',
                    flex: 1,
                    '& .MuiFilledInput-root': {
                        backgroundColor: '#282c34', // Change this to your desired background color
                        '&:hover': {
                        backgroundColor: '#14161a', // Slightly darker on hover
                        },
                        '&.Mui-focused': {
                        backgroundColor: '#14161a', // Even darker when focused
                        },
                    },
                    '& .MuiFilledInput-input': {
                        color: 'white', // Text color
                    },
                    '& .MuiInputLabel-filled': {
                        color: 'gray', // Label color
                    },
                    '& .MuiInputLabel-filled.Mui-focused': {
                        color: 'white', // Label color when focused
                    },
                    '& .MuiFilledInput-underline:before': {
                        borderBottomColor: 'transparent', // Hide underline in normal state
                    },
                    '& .MuiFilledInput-underline:after': {
                        borderBottomColor: 'white', // Underline color when focused
                    }
                    }}
                />
                <TextField
                label="Days since last ban"
                name="days_since_last_ban"
                value={formData.days_since_last_ban}
                onChange={handleInputChange}
                margin="normal"
                variant='filled'
                sx={{
                    margin: '5px 0px 8px 0px',
                    flex: 1,
                    '& .MuiFilledInput-root': {
                        backgroundColor: '#282c34', // Change this to your desired background color
                        '&:hover': {
                        backgroundColor: '#14161a', // Slightly darker on hover
                        },
                        '&.Mui-focused': {
                        backgroundColor: '#14161a', // Even darker when focused
                        },
                    },
                    '& .MuiFilledInput-input': {
                        color: 'white', // Text color
                    },
                    '& .MuiInputLabel-filled': {
                        color: 'gray', // Label color
                    },
                    '& .MuiInputLabel-filled.Mui-focused': {
                        color: 'white', // Label color when focused
                    },
                    '& .MuiFilledInput-underline:before': {
                        borderBottomColor: 'transparent', // Hide underline in normal state
                    },
                    '& .MuiFilledInput-underline:after': {
                        borderBottomColor: 'white', // Underline color when focused
                    }
                    }}
                />
            </div>
            <TextField
            label="Game Hours"
            name="game_hours"
            value={formData.game_hours}
            onChange={handleInputChange}
            margin="normal"
            variant='filled'
            sx={{
                margin: '5px 0px 8px 0px',
                '& .MuiFilledInput-root': {
                    backgroundColor: '#282c34', // Change this to your desired background color
                    '&:hover': {
                    backgroundColor: '#14161a', // Slightly darker on hover
                    },
                    '&.Mui-focused': {
                    backgroundColor: '#14161a', // Even darker when focused
                    },
                },
                '& .MuiFilledInput-input': {
                    color: 'white', // Text color
                },
                '& .MuiInputLabel-filled': {
                    color: 'gray', // Label color
                },
                '& .MuiInputLabel-filled.Mui-focused': {
                    color: 'white', // Label color when focused
                },
                '& .MuiFilledInput-underline:before': {
                    borderBottomColor: 'transparent', // Hide underline in normal state
                },
                '& .MuiFilledInput-underline:after': {
                    borderBottomColor: 'white', // Underline color when focused
                }
                }}
            fullWidth
            />
            <TextField
            label="Steam Level"
            name="steam_level"
            value={formData.steam_level}
            onChange={handleInputChange}
            margin="normal"
            variant='filled'
            sx={{
                margin: '5px 0px 8px 0px',
                '& .MuiFilledInput-root': {
                    backgroundColor: '#282c34', // Change this to your desired background color
                    '&:hover': {
                    backgroundColor: '#14161a', // Slightly darker on hover
                    },
                    '&.Mui-focused': {
                    backgroundColor: '#14161a', // Even darker when focused
                    },
                },
                '& .MuiFilledInput-input': {
                    color: 'white', // Text color
                },
                '& .MuiInputLabel-filled': {
                    color: 'gray', // Label color
                },
                '& .MuiInputLabel-filled.Mui-focused': {
                    color: 'white', // Label color when focused
                },
                '& .MuiFilledInput-underline:before': {
                    borderBottomColor: 'transparent', // Hide underline in normal state
                },
                '& .MuiFilledInput-underline:after': {
                    borderBottomColor: 'white', // Underline color when focused
                }
                }}
            fullWidth
            />
        </div>

        {/* Game Behavior */}
        <div className='checkbox-container'>
            <h5>Game Behavior</h5>
            <p className='description'>Select at least 0 options</p>
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="in_party" 
                checked={formData.in_party} 
                onChange={handleInputChange} />
            }
            label="In Party"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="won_game" 
                checked={formData.won_game} 
                onChange={handleInputChange} />
            }
            label="Won Game"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="lost_game" 
                checked={formData.lost_game} 
                onChange={handleInputChange} />
            }
            label="Lost Game"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="was_kicked" 
                checked={formData.was_kicked} 
                onChange={handleInputChange} />
            }
            label="Kicked from game"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="kicks_others" 
                checked={formData.kicks_others} 
                onChange={handleInputChange} />
            }
            label="Kicks other players"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="hvh" 
                checked={formData.hvh} 
                onChange={handleInputChange} />
            }
            label="HVH"
            />
        </div>

        {/* Profile Info */}
        <div className='checkbox-container'>
            <h5>Profile Info</h5>
            <p className='description'>Select at least 0 options</p>
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="has_unusuals" 
                checked={formData.has_unusuals} 
                onChange={handleInputChange} />
            }
            label="Has Unusuals"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="has_australiums" 
                checked={formData.has_australiums} 
                onChange={handleInputChange} />
            }
            label="Has Australiums"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="edgy_hacker_profile" 
                checked={formData.edgy_hacker_profile} 
                onChange={handleInputChange} />
            }
            label="Edgy Hacker Cringe Profile"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="cheater_steam_group" 
                checked={formData.cheater_steam_group} 
                onChange={handleInputChange} />
            }
            label="In Cheater Steam Group"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="pronouns" 
                checked={formData.pronouns} 
                onChange={handleInputChange} />
            }
            label="Pronouns"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="disables_comments" 
                checked={formData.disables_comments} 
                onChange={handleInputChange} />
            }
            label="Disables Profile Comments"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="responds_comments" 
                checked={formData.responds_comments} 
                onChange={handleInputChange} />
            }
            label="Responds to Profile Comments"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="deletes_comments" 
                checked={formData.deletes_comments} 
                onChange={handleInputChange} />
            }
            label="Deletes Profile Comments"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="is_furry" 
                checked={formData.is_furry} 
                onChange={handleInputChange} />
            }
            label="Furry"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="is_brony" 
                checked={formData.is_brony} 
                onChange={handleInputChange} />
            }
            label="Brony"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="is_lgbt" 
                checked={formData.is_lgbt} 
                onChange={handleInputChange} />
            }
            label="LGBT"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="anime" 
                checked={formData.anime} 
                onChange={handleInputChange} />
            }
            label="Anime"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="hentai" 
                checked={formData.hentai} 
                onChange={handleInputChange} />
            }
            label="Hentai"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="salt" 
                checked={formData.salt} 
                onChange={handleInputChange} />
            }
            label="'Salt'"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="displays_accusations" 
                checked={formData.displays_accusations} 
                onChange={handleInputChange} />
            }
            label="Displays Cheating Accusations"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="pc_specs" 
                checked={formData.pc_specs} 
                onChange={handleInputChange} />
            }
            label="Shitty PC Specs"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="denies_cheating" 
                checked={formData.denies_cheating} 
                onChange={handleInputChange} />
            }
            label="Denies Cheating"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="brags_cheating" 
                checked={formData.brags_cheating} 
                onChange={handleInputChange} />
            }
            label="Brags about not getting caught"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="has_youtube" 
                checked={formData.has_youtube} 
                onChange={handleInputChange} />
            }
            label="Shitty YouTube channel"
            />
            <FormControlLabel
            control={
                <Checkbox 
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'limegreen', // Color when checked
                    },
                }} 
                name="has_twitch" 
                checked={formData.has_twitch} 
                onChange={handleInputChange} />
            }
            label="Shitty Twitch channel"
            />
            <TextField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                variant='filled'
                sx={{
                    marginTop: '8px',
                    '& .MuiFilledInput-root': {
                        backgroundColor: '#282c34', // Change this to your desired background color
                        '&:hover': {
                        backgroundColor: '#14161a', // Slightly darker on hover
                        },
                        '&.Mui-focused': {
                        backgroundColor: '#14161a', // Even darker when focused
                        },
                    },
                    '& .MuiFilledInput-input': {
                        color: 'white', // Text color
                    },
                    '& .MuiInputLabel-filled': {
                        color: 'gray', // Label color
                    },
                    '& .MuiInputLabel-filled.Mui-focused': {
                        color: 'white', // Label color when focused
                    },
                    '& .MuiFilledInput-underline:before': {
                        borderBottomColor: 'transparent', // Hide underline in normal state
                    },
                    '& .MuiFilledInput-underline:after': {
                        borderBottomColor: 'white', // Underline color when focused
                    }
                    }}
                />
        </div>

        {/* Notes */}
        <TextField
        label="Notes"
        name="notes"
        value={formData.notes}
        onChange={handleInputChange}
        margin="normal"
        multiline
        rows={4}
        fullWidth
        variant='filled'
        sx={{
            marginTop: '8px',
            '& .MuiFilledInput-root': {
                backgroundColor: '#282c34', // Change this to your desired background color
                '&:hover': {
                backgroundColor: '#14161a', // Slightly darker on hover
                },
                '&.Mui-focused': {
                backgroundColor: '#14161a', // Even darker when focused
                },
            },
            '& .MuiFilledInput-input': {
                color: 'white', // Text color
            },
            '& .MuiInputLabel-filled': {
                color: 'gray', // Label color
            },
            '& .MuiInputLabel-filled.Mui-focused': {
                color: 'white', // Label color when focused
            },
            '& .MuiFilledInput-underline:before': {
                borderBottomColor: 'transparent', // Hide underline in normal state
            },
            '& .MuiFilledInput-underline:after': {
                borderBottomColor: 'white', // Underline color when focused
            }
            }}
        />

        <Button type="submit" variant="outlined" color="primary" sx={{borderWidth: 1, width: '120px', marginTop: '8px'}}>
            Submit
        </Button>
    </form>
    {/* Snackbar for notifications */}
    <Snackbar
      open={!!notification.message}
      autoHideDuration={6000}
      onClose={() => setNotification({ message: '', type: undefined})}
    >
        <Alert
        onClose={() => setNotification({ message: '', type: undefined })}
        severity={notification.type}
        sx={{ width: '100%' }}
        >
        {notification.message}
        </Alert>
    </Snackbar>
    </div>
  );
};

export default CheaterForm;
