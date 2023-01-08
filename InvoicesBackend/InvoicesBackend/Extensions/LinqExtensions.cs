using InvoicesBackend.Entities;
using System.Linq;
using System.Linq.Expressions;

namespace InvoicesBackend.Extensions
{
    public static class LinqExtensions
    {
        public static IOrderedQueryable<T> OrderBy<T>(this IQueryable<T> source, string memberName, bool asc)
        {
            string methodName = asc ? "OrderBy" : "OrderByDescending";
            var param = Expression.Parameter(typeof(T), "entity");
            var member = GetMember(param, memberName) ?? GetMember(param, "Id") ?? throw new InvalidOperationException($"Unable to get member '{memberName}'");
            var lambda = Expression.Lambda(member, param); // entity => entity.fieldname
            MethodCallExpression resultExp = Expression.Call(typeof(Queryable), methodName, new Type[] { typeof(T), member.Type }, source.Expression, Expression.Quote(lambda));
            return (IOrderedQueryable<T>)source.Provider.CreateQuery<T>(resultExp);
        }

        public static IOrderedQueryable<TSource> ThenBy<TSource, TKey>(this IOrderedQueryable<TSource> source, Expression<Func<TSource, TKey>> keySelector, bool asc)
        {
            return asc ? source.ThenBy(keySelector) : source.ThenByDescending(keySelector);
        }

        private static Expression? GetMember(Expression expression, string memberName)
        {
            foreach (string propertyName in memberName.Split('.'))
            {
                var property = expression.Type.GetProperty(propertyName);
                if (property is null)
                {
                    return null;
                }
                expression = Expression.MakeMemberAccess(expression, property);
            }
            return expression;
        }
    }
}

