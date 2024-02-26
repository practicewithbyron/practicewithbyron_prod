function IsCharNumber(c)
{
    return !isNaN(c);
}

export function validateName(name)
{
    if(name.length <= 1)
    {
        return false;
    }
    else if(name)
    {
        for(let i = 0; i < name.length; i++)
        {
            if(IsCharNumber(name.charAt(i)))
            {
                return false
            }
        }
    }

    return true;
}