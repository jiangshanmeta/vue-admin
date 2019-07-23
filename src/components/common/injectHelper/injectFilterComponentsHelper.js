export default function getNeedInjectFilterComponentsList (filters) {
    return filters
        .filter(item => item.filterComponent.component)
        .map(item => item.filterComponent);
}
