namespace Egypt.Net.Core.Exceptions;

public abstract class EgyptianNationalIdException : Exception
{
    public EgyptianNationalIdException(string message)
        : base(message)
    {
    }
}