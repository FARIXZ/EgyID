namespace Egypt.Net.Core.Exceptions;

public sealed class InvalidNationalIdException : EgyptianNationalIdException
{
    public InvalidNationalIdException(string reason)
        : base($"Invalid Egyptian National ID: {reason}")
    {
    }
}