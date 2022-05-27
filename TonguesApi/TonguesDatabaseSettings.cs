namespace TonguesApi.Data{
    public class TonguesDatabaseSettings{
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
        public string PublicGamesCollectionName{ get; set; } = string.Empty;
        public string UsersCollectionName{ get; set; } = string.Empty;
    }
}