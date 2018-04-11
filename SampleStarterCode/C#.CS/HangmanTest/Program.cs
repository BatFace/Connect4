using HangmanTest.Services;
using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace HangmanTest
{
    class Program
    {
        static async Task Main(string[] args)
        {
            try
            {
                var hangmanServer = HangmanServer();

                // NOTE - Call RegisterUserOnServerAction just once,  and then remember the value returned for x-access-token for next time
                var registerUserAction = new RegisterUserOnServerAction(hangmanServer);
                var x_access_token = await registerUserAction.Execute(username: "CHANGE_ME", password: "CHANGE_ME");

                Login(hangmanServer, x_access_token);

                var newGameAction = new StartNewGameOnServerAction(hangmanServer);
                var newGame = await newGameAction.Execute();

                var allGamesQuery = new AllGamesOnServerQuery(hangmanServer);
                var allGames = await allGamesQuery.Evalulate();

                var currentGameQuery = new CurrentGameOnServerQuery(hangmanServer);
                var game = await currentGameQuery.Evalulate();

                var specificGameQuery = new SpecificGameOnServerQuery(hangmanServer);
                var specificGame = await specificGameQuery.Evalulate(allGames.First().id);

                var makeMoveAction = new PlayMoveOnServerAction(hangmanServer);
                game = await makeMoveAction.Execute('I');

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return;
            }

        }

        private static void Login(HttpClient hangmanServer, string x_access_token)
        {
            hangmanServer.DefaultRequestHeaders.Add("x-access-token", x_access_token);
        }

        private static HttpClient HangmanServer()
        {
            var client = new HttpClient
            {
                BaseAddress = new Uri("http://dojo-hangman-server.herokuapp.com")
            };
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            return client;
        }
    }



}
