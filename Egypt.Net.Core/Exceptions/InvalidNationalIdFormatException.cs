namespace Egypt.Net.Core.Exceptions;

public sealed class InvalidNationalIdFormatException : EgyptianNationalIdException
{
    public InvalidNationalIdFormatException(string reason)
        : base(reason)
    {
    }
}